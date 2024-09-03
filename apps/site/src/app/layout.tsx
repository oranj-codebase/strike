"use client"
import React from "react";
import { Connect2ICProvider } from "@blinks-icp/wallet-adapter-react";
import { createClient, defaultProviders } from "@blinks-icp/wallet-adapter";
import "@blinks-icp/core/index.css";
import "@blinks-icp/wallet-adapter-react/index.css";
import '../../public/css/index.css';

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/strike.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>STRIKE | Blinks on ICP</title>
            </head>
            <body>
                <Connect2ICProvider client={client}>
                    <div id="root">{children}</div>
                </Connect2ICProvider>
            </body>
        </html>
    )
}