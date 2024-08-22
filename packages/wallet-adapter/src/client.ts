import {
  createMachine,
  assign,
  forwardTo,
  interpret,
  Interpreter,
} from "xstate";
import type { MachineConfig } from "xstate";
import { Actor, HttpAgent, type ActorSubclass } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import EventEmitter from "events";
import { ok, Result } from "neverthrow";
import {
  CreateActorError,
  defaultProviders,
  type CreateActorResult,
  type IConnector,
} from "./providers";

type Provider = IConnector;

type SupporedProviders = "ii" | "plug" | "stoic" | "dfinity";

export type RootContext = {
  host: string;
  dev: boolean;
  autoConnect: boolean;
  whitelist: Array<string>;
  principal?: string;
  activeProvider?: Provider;
  providers: Array<Provider>;
  connectingProvider?: string;
  canisters: {
    [canisterName: string]: {
      canisterId: string;
      idlFactory: IDL.InterfaceFactory;
    };
  };
  actors: {
    [canisterName: string]: Result<ActorSubclass, { kind: CreateActorError }>;
  };
  anonymousActors: {
    [canisterName: string]: Result<ActorSubclass, { kind: CreateActorError }>;
  };
};

type DoneEvent = { type: "DONE"; data: { providers: Array<Provider> } };
type DoneAndConnectedEvent = {
  type: "DONE_AND_CONNECTED";
  data: {
    activeProvider: Provider;
    providers: Array<Provider>;
    principal: string;
  };
};
// TODO: options type
type ConnectEvent = { type: "CONNECT"; data: { provider: string } };
type CancelConnectEvent = { type: "CANCEL_CONNECT" };
type ConnectDoneEvent = {
  type: "CONNECT_DONE";
  data: { activeProvider: Provider; principal: string };
};
type DisconnectEvent = { type: "DISCONNECT" };
type ErrorEvent = { type: "ERROR"; data: { error: any } };
type CreateActorEvent = {
  type: "CREATE_ACTOR";
  data: {
    canisterName: string;
    canisterId: string;
    idlFactory: IDL.InterfaceFactory;
  };
};
type SaveActorEvent<Service> = {
  type: "SAVE_ACTOR";
  data: { actor: CreateActorResult<Service>; canisterName: string };
};
type CreateAnonymousActorEvent = {
  type: "CREATE_ANONYMOUS_ACTOR";
  data: {
    canisterName: string;
    canisterId: string;
    idlFactory: IDL.InterfaceFactory;
  };
};
type SaveAnonymousActorEvent<Service> = {
  type: "SAVE_ANONYMOUS_ACTOR";
  data: { actor: CreateActorResult<Service>; canisterName: string };
};

export type RootEvent<Service = any> =
  | DoneEvent
  | ConnectDoneEvent
  | DoneAndConnectedEvent
  | ConnectEvent
  | CancelConnectEvent
  | DisconnectEvent
  | ErrorEvent
  | CreateActorEvent
  | SaveActorEvent<Service>
  | CreateAnonymousActorEvent
  | SaveAnonymousActorEvent<Service>;

const authStates: MachineConfig<RootContext, any, RootEvent> = {
  id: "auth",
  initial: "initializing",
  schema: {
    context: {} as RootContext,
    events: {} as RootEvent,
  },
  states: {
    initializing: {
      on: {
        DONE: {
          target: "idle",
          actions: assign((context, event) => ({
            providers: event.data.providers,
          })),
        },
        DONE_AND_CONNECTED: {
          target: "connected",
          actions: [
            assign((context, event) => ({
              providers: event.data.providers,
              activeProvider: event.data.activeProvider,
              principal: event.data.principal,
            })),
          ],
        },
        ERROR: {
          // ?
        },
      },
      invoke: {
        id: "init",
        src: (context, event) => async (callback, onReceive) => {
          const { providers } = context;
          await Promise.all(providers.map((p) => p.init()));
          let connectedProviders = providers.map(
            (p) =>
              new Promise<Provider>(async (resolve, reject) => {
                const isConnected = await p.isConnected();
                isConnected ? resolve(p) : reject();
              })
          );
          // TODO: init failure
          Promise.any(connectedProviders)
            .then((connectedProvider) => {
              callback({
                type: "DONE_AND_CONNECTED",
                data: {
                  providers,
                  activeProvider: connectedProvider,
                  principal: connectedProvider.principal!,
                },
              });
            })
            .catch((e: any) => {
              callback({ type: "DONE", data: { providers } });
            });
        },
      },
      exit: ["onInit"],
    },
    idle: {
      on: {
        CONNECT: {
          // actions: forwardTo("connectService"),
          target: "connecting",
          // TODO: save connecting provider?
        },
      },
    },
    connecting: {
      entry: ["onConnecting"],
      on: {
        CONNECT: {
          // actions: forwardTo("connectService"),
          target: "connecting",
          // TODO: save connecting provider?
        },
        CANCEL_CONNECT: {
          target: "idle",
        },
        CONNECT_DONE: {
          target: "connected",
          actions: [
            assign((context, event) => ({
              activeProvider: event.data.activeProvider,
              principal: event.data.principal,
            })),
          ],
        },
        ERROR: {
          // actions: assign((context, event) => {
          //   return ({
          //     provider: event.data.provider,
          //     principal: event.data.principal,
          //   })
          // }),
        },
      },
      invoke: {
        id: "connectService",
        // src: "connectService",
        src: (context, _event) => async (callback, onReceive) => {
          // onReceive(async (e) => {
          //   // TODO: Handle cancellation with AbortController?
          //   // if (e.type === "CONNECT") {
          //   // }
          // })
          if (_event.type !== "CONNECT") {
            return;
          }
          const provider = context.providers.find(
            (p) => p.meta.id === _event.data.provider
          );
          if (!provider) {
            callback({
              type: "ERROR",
              data: {
                error: "Provider not found",
              },
            });
            return;
          }
          const result = await provider.connect();
          result.match(
            () => {
              callback({
                type: "CONNECT_DONE",
                data: {
                  activeProvider: provider,
                  principal: provider.principal!,
                },
              });
            },
            (e) => {
              console.error(e);
              callback({
                type: "ERROR",
                data: {
                  error: _event,
                },
              });
            }
          );
        },
        autoForward: true,
      },
    },
    connected: {
      entry: ["onConnected"],
      invoke: {
        id: "actorService",
        src: "actorService",
        autoForward: true,
      },
      on: {
        DISCONNECT: {
          target: "disconnecting",
          // TODO: pass provider?
        },
        SAVE_ACTOR: {
          actions: assign((context, event) => ({
            actors: {
              ...context.actors,
              [event.data.canisterName]: event.data.actor,
            },
          })),
        },
      },
    },
    disconnecting: {
      invoke: {
        id: "disconnect",
        src: (context, event) => async () => {
          await context.activeProvider?.disconnect();
        },
        onDone: {
          target: "idle",
          // TODO: empty context
          actions: [
            assign((context, event) => ({
              activeProvider: undefined,
              actors: {},
              principal: undefined,
            })),
            "onDisconnect",
          ],
        },
        onError: {
          target: "connected",
          actions: [],
        },
      },
    },
  },
};

type Config = {
  whitelist?: Array<string>;
  host?: string;
  dev?: boolean;
  autoConnect?: boolean;
  providerUrl?: string;
  ledgerCanisterId?: string;
  ledgerHost?: string;
  appName?: string;
};

type ClientOptions = {
  providers: Array<Provider> | ((config: Config) => Array<Provider>);
  canisters?: {
    [canisterName: string]: {
      canisterId: string;
      idlFactory: IDL.InterfaceFactory;
    };
  };
  globalProviderConfig?: {
    whitelist?: Array<string>;
    host?: string;
    dev?: boolean;
    autoConnect?: boolean;
    ledgerCanisterId?: string;
    ledgerHost?: string;
    appName?: string;
    customDomain?: string;
  };
};

class Client {
  public _service: Interpreter<RootContext, any, RootEvent>;
  public config;
  private _emitter: EventEmitter;

  constructor(
    service: Interpreter<RootContext, any, RootEvent>,
    emitter: EventEmitter,
    config: Config
  ) {
    this._service = service;
    this._emitter = emitter;
    this.config = config;
  }

  on(evt: string, fn: (...args: any[]) => void) {
    this._emitter.on(evt, fn);
    return () => this._emitter.off(evt, fn);
  }

  subscribe(fn: (...args: any[]) => void) {
    const sub = this._service.subscribe(fn);
    return sub.unsubscribe;
  }

  connect(provider: string = "ii") {
    this._service.send({ type: "CONNECT", data: { provider } });
  }

  async connectAsync(provider: string = "ii") {
    // TODO: handle previous connected provider

    this._service.send({ type: "CONNECT", data: { provider } });

    return new Promise<ConnectDoneEvent["data"]>((resolve, reject) => {
      this._service.onTransition(({ event }) => {
        console.log(event);
        switch (event.type) {
          case "CONNECT_DONE":
            resolve(event.data);
            break;
          default:
            reject(event);
        }
      });
    });
  }

  cancelConnect() {
    this._service.send({ type: "CANCEL_CONNECT" });
  }

  public disconnect() {
    this._service.send({ type: "DISCONNECT" });
  }

  public get agent() {
    return new HttpAgent({
      host: this.config.host,
      identity: this.activeProvider?.identity,
    });
  }

  public get providers() {
    return this._service.state.context.providers;
  }

  public get activeProvider() {
    return this._service.state.context.activeProvider;
  }

  public get principal() {
    return this._service.state.context.principal;
  }

  public get actors() {
    return this._service.state.context.actors;
  }

  public get anonymousActors() {
    return this._service.state.context.anonymousActors;
  }

  public get status() {
    return this._service.state.value;
  }
}

const createClient = ({
  canisters = {},
  providers: p = defaultProviders(),
  globalProviderConfig = {},
}: Partial<ClientOptions>) => {
  const config = {
    dev: true,
    autoConnect: true,
    host: window.location.origin,
    whitelist: Object.values(canisters).map(
      (canister) =>
        (
          canister as {
            canisterId: string;
            idlFactory: IDL.InterfaceFactory;
          }
        ).canisterId
    ),
    ...globalProviderConfig,
  };
  const providers = typeof p === "function" ? p(config) : p;

  providers.forEach((p) => (p.config = config));

  const agent = new HttpAgent({ host: config.host });
  if (config.dev) {
    agent.fetchRootKey().catch((e) => console.error(e));
  }
  const anonymousActors = Object.entries(canisters)
    .map(([canisterName, val]) => {
      const { canisterId, idlFactory } = val;
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId,
      });
      return { actor, canisterName, idlFactory, canisterId };
    })
    .reduce(
      (acc, { canisterName, actor }) => ({
        ...acc,
        [canisterName]: ok(actor),
      }),
      {}
    );

  const emitter = new EventEmitter();

  const rootMachine = createMachine<RootContext, RootEvent>(
    {
      id: "root",
      initial: "idle",
      context: {
        ...config,
        providers,
        anonymousActors,
        canisters,
        actors: {},
        principal: undefined,
        activeProvider: undefined,
      },
      schema: {
        context: {} as RootContext,
        events: {} as RootEvent,
      },
      states: {
        idle: {
          ...authStates,
        },
      },
    },
    {
      services: {
        actorService: (context, _event) => (callback, onReceive) => {
          onReceive(async (e: RootEvent) => {
            if (e.type === "CREATE_ACTOR") {
              const result = await context.activeProvider!.createActor(
                e.data.canisterId,
                e.data.idlFactory
              );
              callback({
                type: "SAVE_ACTOR",
                data: { actor: result, canisterName: e.data.canisterName },
              });
              // result.match(
              //   (actor) => {
              //     callback({ type: "SAVE_ACTOR", data: { actor: result, canisterName: e.data.canisterName } })
              //   },
              //   (error) => {
              //     // TODO: ?
              //     callback({ type: "ERROR", data: { error } })
              //   },
              // )
            }
          });
          // Initialize
          Object.keys(context.canisters).forEach(async (canisterName) => {
            const { canisterId, idlFactory } = context.canisters[canisterName];
            const result = await context.activeProvider!.createActor(
              canisterId,
              idlFactory
            );
            callback({
              type: "SAVE_ACTOR",
              data: { actor: result, canisterName },
            });
          });
        },
      },
      actions: {
        onInit: () => {
          emitter.emit("init");
        },
        onConnecting: () => {
          emitter.emit("connecting");
        },
        onConnected: (
          context,
          event: ConnectDoneEvent | DoneAndConnectedEvent
        ) => {
          console.log("event", context, event);
          emitter.emit("connect", event.data);
          // TODO: check if works
          return assign({
            connectingProvider: event.data,
          });
        },
        onDisconnecting: () => {
          emitter.emit("disconnecting");
        },
        onDisconnect: () => {
          emitter.emit("disconnect");
        },
      },
    }
  );

  const service = interpret(rootMachine, { devTools: true });

  service.start();

  // @ts-ignore
  return new Client(service, emitter, config);
};

export { createClient, Client };
