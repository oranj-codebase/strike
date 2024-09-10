"use client"
import { useEffect, useState } from "react";
import {
    Blink,
    Action,
    ActionAdapter,
    ActionGetResponse,
    ICP_BLINK_PREFIX
} from "@blinks-icp/core";
import { ConnectButton, ConnectDialog } from "@blinks-icp/wallet-adapter-react";
import { StrikeLogo } from "@/assets";
import { ActionMetadata } from "@/types";
import { host } from "@/config";
import { HttpAgent } from "@dfinity/agent";
import { getActionData } from "@/utils";

const StrikeDashBoard = ({
    data,
    metadata,
    apiUrl,
}: {
    data?: ActionGetResponse,
    metadata?: ActionMetadata;
    apiUrl?: string;
}) => {

    const agent = new HttpAgent({ host });
    const adapter: ActionAdapter = {
        agent,
        connect: async () => { return "" },
        createActor: async (
        ) => { return { error: "" } }
    }

    const [action, setAction] = useState<Action>(null);
    const [tempUrl, setTempUrl] = useState<string>("");

    const handlerUnFurlBtnClick = async () => {
        const actionUrl = new URL(tempUrl).searchParams.get('action');
        if (ICP_BLINK_PREFIX.test(actionUrl)) {
            const { data, apiUrl, metadata } = await getActionData(tempUrl);
            setAction(new Action(apiUrl, { ...data, type: "action" }, metadata, adapter));
        } else {
            setTempUrl("");
        }
    }

    useEffect(() => {
        if (apiUrl && metadata && data) {
            setAction(new Action(apiUrl, { ...data, type: "action" }, metadata, adapter));
        }
    }, []);

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
                        <div className="border rounded-md flex px-2 py-1 bg-white">
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
                            onClick={handlerUnFurlBtnClick}
                        >

                            Unfurl
                        </button>
                    </div>
                    <div className="w-full max-w-md">
                        {action && (
                            <Blink action={action} websiteText={action.canisterId} />
                        )}
                    </div>
                    <ConnectDialog />
                </section>
            </main>
            <footer></footer>
        </div>
    )
}

export default StrikeDashBoard;