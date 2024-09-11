'use client';

import { Connect2ICProvider } from '@blinks-icp/wallet-adapter-react';
import { createClient, defaultProviders } from '@blinks-icp/wallet-adapter';
import '@blinks-icp/core/index.css';
import '@blinks-icp/wallet-adapter-react/index.css';
import { host, provider } from '../config';

const isServer = typeof window === 'undefined';

const providers = isServer
  ? []
  : defaultProviders({
      host,
      providerUrl: provider,
    });

const client = createClient({
  providers,
  globalProviderConfig: {
    host,
  },
});
export default function ConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>;
}
