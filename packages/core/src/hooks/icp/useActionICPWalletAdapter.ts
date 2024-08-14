'use client';

import { HttpAgent } from '@dfinity/agent';
import { useAuth } from '@ic-reactor/react';
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
export function useActionICPWalletAdapter({
  agent,
  identityProvider = 'https://identity.ic0.app',
}: {
  agent: HttpAgent;
  identityProvider?: string;
}) {
  const { login, identity } = useAuth();
  const adapter = useMemo(() => {
    return new ActionConfig(agent, {
      connect: async () => {
        if (identity) {
          return identity.getPrincipal().toString();
        }

        try {
          await login({ identityProvider });
        } catch {
          return null;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return identity?.getPrincipal().toString() ?? null;
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
  }, [agent, login, identity, identityProvider]);

  return { adapter };
}
