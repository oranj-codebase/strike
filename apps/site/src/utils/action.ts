
import { ActionGetResponse } from "@blinks-icp/core";
import { proxify } from "./proxify";
import { unfurlUrlToActionApiUrl } from "./url-mapper";
import { ActionForBlink, ActionMetadata } from "@/types";

export const getActionData = async (url: string): Promise<ActionForBlink> => {
    if (!url)
        return null;

    const actionApiUrl = await unfurlUrlToActionApiUrl(new URL(url));
    const proxyUrl = proxify(actionApiUrl);
    const res = await fetch(proxyUrl, {
        headers: {
            Accept: 'application/json',
        }
    });
    if (!res.ok) {
        throw new Error(
            `Failed to fetch action ${proxyUrl}, action url: ${url}`,
        );
    }
    const data = (await res.json()) as ActionGetResponse;
    const metadata = getActionMetadata(res);
    return {
        data,
        metadata,
        apiUrl: actionApiUrl,
    }
}

export const getActionMetadata = (response: Response): ActionMetadata => {
    const blockchainIds = (
        response?.headers?.get('x-blockchain-ids') || ''
    ).split(',');

    return {
        blockchainIds,
    } satisfies ActionMetadata;
};