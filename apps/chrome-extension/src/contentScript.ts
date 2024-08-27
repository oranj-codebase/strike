import '@blinks-icp/core/index.css';
import { ActionConfig, setupTwitterObserver } from '@blinks-icp/core';
import { createClient, defaultProviders } from '@blinks-icp/wallet-adapter';
import type { IDL } from '@dfinity/candid';

export const host =
  import.meta.env.VITE_DFX_NETWORK === 'ic'
    ? 'https://icp0.io'
    : 'http://127.0.0.1:4943';

export const provider =
  import.meta.env.VITE_DFX_NETWORK === 'ic'
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

let count = 1;

const adapter = (wallet: string) => {
  const client = createClient({
    providers: defaultProviders({
      host,
      providerUrl: provider,
    }),
    globalProviderConfig: {
      host,
    },
  });

  return new ActionConfig(host, {
    createActor: async (
      canisterId: string,
      idlFactory: IDL.InterfaceFactory,
    ) => {
      const actorResult = await client.activeProvider?.createActor(
        canisterId,
        idlFactory,
      );

      if (!actorResult || actorResult.isErr()) {
        return { error: 'Unable to create actor' };
      }
      const actor = actorResult.value;
      return { actor };
    },
    connect: async () => {
      if (client.status === 'connected') {
        return client.activeProvider!.principal!;
      }
      const { activeProvider } = await client.connectAsync('ii');
      return activeProvider.principal ?? null;
    },
  });
};

function initTwitterObserver() {
  setupTwitterObserver(adapter('ii'));
}

initTwitterObserver();
