import "@blinks-icp/core/index.css";
import { Blink, useAction } from "@blinks-icp/core";
import { useActionSolanaWalletAdapter } from "@blinks-icp/core/hooks/solana";

const App = () => {
  const url =
    "https://dial.to/?action=solana-action:https://sanctum.dial.to/trade/SOL-hSOL";
  // useAction initiates registry, adapter and fetches the action.
  const { adapter } = useActionSolanaWalletAdapter(
    "https://api.mainnet-beta.solana.com/"
  );
  const { action } = useAction({ url, adapter });

  return (
    <main className="flex min-h-screen flex-col px-2 py-4 md:px-8">
      <section className="flex flex-1 flex-col items-center justify-center pt-4 lg:pt-0">
        <div className="w-full max-w-md">
          {action ? (
            <Blink action={action} websiteText={new URL(url).hostname} />
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default App;
