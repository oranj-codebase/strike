import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Connect2ICProvider } from "@blinks-icp/wallet-adapter-react";
import { createClient, defaultProviders } from "@blinks-icp/wallet-adapter";
import "@blinks-icp/core/index.css";
import "@blinks-icp/wallet-adapter-react/index.css";

import { host, provider } from "./config";
import { StrikePage } from "./pages";

const client = createClient({
  providers: defaultProviders({
    host,
    providerUrl: provider,
  }),
  globalProviderConfig: {
    host,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <StrikePage />,
  },
]);

const App = () => {
  return (
    <Connect2ICProvider client={client}>
      <RouterProvider router={router} />
    </Connect2ICProvider>
  );
};

export default App;
