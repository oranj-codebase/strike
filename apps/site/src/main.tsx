import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Connect2ICProvider } from "@blinks-icp/wallet-adapter-react";
import { createClient, defaultProviders } from "@blinks-icp/wallet-adapter";

import App from "./App.tsx";
import "./index.css";
import { host, provider } from "./config.ts";

const client = createClient({
  providers: defaultProviders({
    host,
    providerUrl: provider,
  }),
  globalProviderConfig: {
    host,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Connect2ICProvider client={client}>
      <App />
    </Connect2ICProvider>
  </StrictMode>
);
