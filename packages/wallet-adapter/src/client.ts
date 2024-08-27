import { createActor, Actor } from "xstate";
import { HttpAgent } from "@dfinity/agent";
import EventEmitter from "events";
import { defaultProviders, type IConnector } from "./providers";
import { createAuthMachine, type ConncetedEvent } from "./authMachine";

type Provider = IConnector;

type SupporedProviders = "ii" | "plug" | "stoic" | "dfinity";

// const authStates: MachineConfig<RootContext, any, RootEvent> = ;

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
  public _service: Actor<ReturnType<typeof createAuthMachine>>;
  public config;

  constructor(service: any, config: Config) {
    this._service = service;
    this.config = config;
  }

  connect(provider?: string) {
    this._service.send({ type: "CONNECT", data: { provider } });
  }

  async connectAsync(provider?: string) {
    this._service.send({ type: "CONNECT", data: { provider } });

    return new Promise<ConncetedEvent["data"]>((resolve, reject) => {
      this._service.on("CONNECTED", (event) => {
        resolve(event.data);
      });
      this._service.on("ERROR", (event) => {
        reject(event.data);
      });
    });
  }

  cancelConnect() {
    this._service.send({ type: "CANCEL_CONNECT" });
  }

  public disconnect() {
    console.log(this._service.getSnapshot().context);
    this._service.send({ type: "DISCONNECT" });
  }

  public get agent() {
    return new HttpAgent({
      host: this.config.host,
      identity: this.activeProvider?.identity,
    });
  }

  public get providers() {
    return this._service.getSnapshot().context.providers;
  }

  public get activeProvider() {
    return this._service.getSnapshot().context.activeProvider;
  }

  public get principal() {
    return this._service.getSnapshot().context.principal;
  }

  public get status() {
    return this._service.getSnapshot().value;
  }
}

const createClient = ({
  providers: p = defaultProviders(),
  globalProviderConfig = {},
}: Partial<ClientOptions>) => {
  const config = {
    dev: true,
    autoConnect: true,
    host: window.location.origin,
    ...globalProviderConfig,
    whitelist: globalProviderConfig.whitelist || [],
    principal: undefined,
  };
  const providers = typeof p === "function" ? p(config) : p;

  providers.forEach((p) => (p.config = config));

  const agent = new HttpAgent({ host: config.host });
  if (config.dev) {
    agent.fetchRootKey().catch((e) => console.error(e));
  }

  const actor = createActor(createAuthMachine({ ...config, providers }), {
    inspect(inspectionEvent) {
      console.debug(inspectionEvent);
    },
  });

  actor.start();

  return new Client(actor, config);
};

export { createClient, Client };
