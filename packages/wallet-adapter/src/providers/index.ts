import { InternetIdentity } from "./internet-identity";
import { NFID } from "./nfid";
import type { IConnector, IWalletConnector } from "./connectors";
import { InfinityWallet } from "./bitfinity-wallet";
import { PlugWallet } from "./plug-wallet";

export * from "./connectors";
export type Provider = IConnector & Partial<IWalletConnector>;
export type WalletProvider = IConnector & IWalletConnector;

export type Config = {
  whitelist?: Array<string>;
  host?: string;
  autoConnect?: boolean;
  providerUrl?: string;
  ledgerCanisterId?: string;
  ledgerHost?: string;
  appName?: string;
  delegationModes?: Array<any>;
};

export function defaultProviders(
  config: Config | undefined = {}
): Array<Provider> {
  return [
    new InternetIdentity(config),
    new NFID(config),
    new InfinityWallet(config),
    new PlugWallet(config),
  ];
}

export function walletProviders(
  config: Config | undefined = {}
): Array<WalletProvider> {
  return [new PlugWallet(config)];
}

export { InternetIdentity, NFID };
