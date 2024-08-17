import { useState } from "react";
import { HttpAgent } from "@dfinity/agent";
import { Blink, useAction, useActionICPWalletAdapter } from "@blinks-icp/core";
import { ConnectButton, ConnectDialog } from "@blinks-icp/wallet-adapter-react";

import "@blinks-icp/core/index.css";
import "@blinks-icp/wallet-adapter-react/index.css";

const App = () => {
  const [tempUrl, setTempUrl] = useState("");
  const [url, setUrl] = useState(
    "icp-action:http://localhost:5173/actions.json"
  );
  // useAction initiates registry, adapter and fetches the action.
  // TODO: update this
  const agent = new HttpAgent();
  const { adapter } = useActionICPWalletAdapter({
    agent,
  });
  const { action } = useAction({ url, adapter });
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-2 border border-b">
        <h2>STRIKE</h2>
        <ConnectButton />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-2 py-4 md:px-8">
        <section className="flex w-full flex-1 flex-col items-center justify-center gap-6">
          <div className="flex flex-row gap-2">
            <div className="border rounded-md flex px-2 py-1">
              <input
                type="text"
                className="outline-none min-w-[320px]"
                placeholder="icp-action:https://blinks-icp-site.vercel.app/actions.json"
                onChange={(e) => setTempUrl(e.target.value)}
              />
            </div>
            <button
              className="flex w-full items-center justify-center text-nowrap rounded-button px-4 py-3 text-text font-semibold transition-colors motion-reduce:transition-none bg-[#232327] text-white rounded-md hover:bg-button-hover"
              onClick={() => setUrl(tempUrl)}
            >
              Unfurl
            </button>
          </div>
          <div className="w-full max-w-md">
            {action ? (
              <Blink action={action} websiteText={action.canisterId} />
            ) : null}
          </div>
          <ConnectDialog />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
