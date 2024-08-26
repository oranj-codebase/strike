'use client';

import { useConnect, useDialog } from '@blinks-icp/wallet-adapter-react';
import { HttpAgent } from '@dfinity/agent';

import { useMemo } from 'react';

import { ActionConfig } from '../../api';

/**
 * Hook to create an action adapter using ICP's wallet adapter.
 *
 * Be sure to call `action.setAdapter` with the to update the adapter, every time the instance updates.
 *
 * @param rpcUrlOrConnection
 * @see {Action}
 */
export function useActionICPWalletAdapter({ agent }: { agent: HttpAgent }) {
  const { isConnected, principal, connectAsync } = useConnect();
  const { open } = useDialog();

  const adapter = useMemo(() => {
    return new ActionConfig(agent, {
      connect: async () => {
        console.log(isConnected, principal);
        if (isConnected) {
          return principal!;
        }

        try {
          console.log(`attemp`);
          const { activeProvider } = await connectAsync();
          console.log(activeProvider);
          return activeProvider.principal ?? null;
        } catch (error) {
          console.log(error);
          open();
          return null;
        }
      },
      // ICP doesn't need
      signTransaction: async (txData: string) => {
        try {
          return { signature: txData };
        } catch {
          return { error: 'Signing failed.' };
        }
      },
    });
  }, [agent, isConnected, principal, open, connectAsync]);

  return { adapter };
}
