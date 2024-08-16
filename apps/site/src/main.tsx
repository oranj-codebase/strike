import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AgentProvider } from "@ic-reactor/react";
import {
  Connect2ICProvider,
  createClient,
} from "@blinks-icp/wallet-adapter-react";

const client = createClient({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Connect2ICProvider client={client}>
      <AgentProvider>
        <App />
      </AgentProvider>
    </Connect2ICProvider>
  </StrictMode>
);
