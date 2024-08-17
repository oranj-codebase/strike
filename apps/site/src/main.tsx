import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Connect2ICProvider,
  createClient,
  defaultProviders,
} from "@blinks-icp/wallet-adapter-react";

import App from "./App.tsx";
import "./index.css";

const client = createClient({
  providers: defaultProviders({
    host: "https://icp0.io",
    // providerUrl:
    //   "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai",
  }),
  globalProviderConfig: {
    host: "https://icp0.io",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Connect2ICProvider client={client}>
      <App />
    </Connect2ICProvider>
  </StrictMode>
);
