'use client';

import { Connect2ICProvider } from '@oranjlabs/icp-wallet-adapter-react';
import { createClient, defaultProviders } from '@oranjlabs/icp-wallet-adapter';
import '@oranjlabs/strike/index.css';
import '@oranjlabs/icp-wallet-adapter-react/index.css';
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
