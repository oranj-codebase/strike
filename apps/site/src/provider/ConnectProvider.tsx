"use client"

import { Connect2ICProvider } from "@blinks-icp/wallet-adapter-react";
import { createClient, defaultProviders } from "@blinks-icp/wallet-adapter";
import "@blinks-icp/core/index.css";
import "@blinks-icp/wallet-adapter-react/index.css";
import { host, provider } from "../config";

const client = createClient({
    providers: defaultProviders({
        host,
        providerUrl: provider,
    }),
    globalProviderConfig: {
        host,
    },
});

export default function ConnectProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>
}