"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { ICP_BLINK_PREFIX } from "@blinks-icp/core";
import { ConnectButton, ConnectDialog } from "@blinks-icp/wallet-adapter-react";
import StrikeRenderer from "./component/strike-renderer";
import StrikeLogo from '../../public/img/svg/StrikeLogo';

const Home = () => {

    const searchParams = useSearchParams();
    const [tempUrl, setTempUrl] = useState<string>("");
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const actionUrl = searchParams.get("action");

        if (actionUrl && ICP_BLINK_PREFIX.test(actionUrl)) {
            setUrl(actionUrl);
        }
    }, [searchParams]);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between px-20 py-5 border border-b ">
                <div className="flex gap-3">
                    <StrikeLogo />
                    <h1 className="font-bold text-highlight">STRIKE</h1>
                </div>
                <ConnectButton />
            </header>
            <main className="flex flex-1 flex-col items-center justify-center px-2 py-4 md:px-8">
                <section className="flex w-full flex-1 flex-col items-center justify-center gap-6">
                    <div className="flex flex-row gap-2">
                        <div className="border rounded-md flex px-2 py-1">
                            <input
                                type="text"
                                className="outline-none min-w-[320px]"
                                placeholder="Enter URL to unfurl"
                                value={tempUrl}
                                onChange={(e) => setTempUrl(e.target.value)}
                            />
                        </div>
                        <button
                            className="flex w-full items-center justify-center text-nowrap rounded-button px-4 py-3 text-text font-semibold transition-colors motion-reduce:transition-none bg-[#232327] text-white rounded-md hover:bg-button-hover"
                            onClick={() =>
                                ICP_BLINK_PREFIX.test(
                                    new URL(tempUrl).searchParams.get("action") ?? ""
                                )
                                    ? setUrl(tempUrl)
                                    : null
                            }
                        >
                            Unfurl
                        </button>
                    </div>
                    <div className="w-full max-w-md">
                        {url && <StrikeRenderer url={url} />}
                    </div>
                    <ConnectDialog />
                </section>
            </main>
            <footer></footer>
        </div>
    )
}

export default Home;