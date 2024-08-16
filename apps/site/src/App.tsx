import { HttpAgent } from "@dfinity/agent";
import { Blink, useAction, useActionICPWalletAdapter } from "@blinks-icp/core";
import { ConnectButton } from "@blinks-icp/wallet-adapter-react";

import "@blinks-icp/core/dist/index.css";

const App = () => {
  const url =
    "https://dial.to/?action=solana-action:https://sanctum.dial.to/trade/SOL-hSOL";
  // useAction initiates registry, adapter and fetches the action.
  const agent = new HttpAgent();
  const { adapter } = useActionICPWalletAdapter({
    agent,
    identityProvider:
      "http://localhost:4943/?canisterId=b77ix-eeaaa-aaaaa-qaada-cai",
  });
  const { action } = useAction({ url, adapter });
  return (
    <main className="flex min-h-screen flex-col px-2 py-4 md:px-8">
      <section className="flex flex-1 flex-col items-center justify-center pt-4 lg:pt-0">
        <div className="w-full max-w-md">
          {action ? (
            <Blink action={action} websiteText={new URL(url).hostname} />
          ) : null}
        </div>
        <ConnectButton />
      </section>
    </main>
  );
};

export default App;
