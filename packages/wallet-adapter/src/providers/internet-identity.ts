import {
  Actor,
  AnonymousIdentity,
  HttpAgent,
  type Identity,
} from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { ok, err } from "neverthrow";

import {
  ConnectError,
  CreateActorError,
  DisconnectError,
  InitError,
  type IConnector,
} from "./connectors";
import dfinityLogoLight from "../assets/dfinity.svg";
import dfinityLogoDark from "../assets/dfinity.svg";

class InternetIdentity implements IConnector {
  public meta = {
    features: [],
    icon: {
      light: dfinityLogoLight,
      dark: dfinityLogoDark,
    },
    id: "ii",
    name: "Internet Identity",
  };

  #config: {
    whitelist: Array<string>;
    host: string;
    providerUrl: string;
  };
  #identity: Identity;
  #principal?: string;
  #client?: AuthClient;

  get principal() {
    return this.#principal;
  }

  get client() {
    return this.#client;
  }

  constructor(userConfig = {}) {
    this.#config = {
      whitelist: [],
      host: "https://icp0.io",
      providerUrl: "https://identity.ic0.app",
      ...userConfig,
    };
    this.#identity = new AnonymousIdentity();
  }

  set config(config) {
    this.#config = { ...this.#config, ...config };
  }

  get config() {
    return this.#config;
  }

  async init() {
    try {
      this.#client = await AuthClient.create();
      const isConnected = await this.isConnected();
      if (isConnected) {
        this.#identity = this.#client.getIdentity();
        this.#principal = this.#identity?.getPrincipal().toString();
      }
      return ok({ isConnected });
    } catch (e) {
      console.error(e);
      return err({ kind: InitError.InitFailed });
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      if (!this.#client) {
        return false;
      }
      return await this.#client!.isAuthenticated();
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async createActor<Service>(canisterId: string, idlFactory: any) {
    try {
      const agent = new HttpAgent({
        ...this.#config,
        identity: this.#identity,
      });

      if (agent.isLocal()) {
        const res = await agent
          .fetchRootKey()
          .then(() => ok(true))
          .catch((e) => err({ kind: CreateActorError.FetchRootKeyFailed }));
        if (res.isErr()) {
          return res;
        }
      }
      const actor = Actor.createActor<Service>(idlFactory, {
        agent,
        canisterId,
      });
      return ok(actor);
    } catch (e) {
      console.error(e);
      return err({ kind: CreateActorError.CreateActorFailed });
    }
  }

  async connect() {
    try {
      await new Promise<void>((resolve, reject) => {
        this.#client?.login({
          identityProvider: this.#config.providerUrl,
          onSuccess: resolve,
          onError: reject,
        });
      });
      const identity = this.#client?.getIdentity();
      const principal = identity?.getPrincipal().toString();
      if (identity) {
        this.#identity = identity;
      }
      this.#principal = principal;
      return ok(true);
    } catch (e) {
      console.error(e);
      return err({ kind: ConnectError.ConnectFailed });
    }
  }

  async disconnect() {
    try {
      await this.#client?.logout();
      return ok(true);
    } catch (e) {
      console.error(e);
      return err({ kind: DisconnectError.DisconnectFailed });
    }
  }

  get identity() {
    return this.#identity;
  }
}

export { InternetIdentity };
