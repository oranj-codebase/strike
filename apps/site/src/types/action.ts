import { ActionGetResponse } from "@blinks-icp/core";

export interface ActionMetadata {
    blockchainIds: string[];
}

export interface ActionForBlink {
    apiUrl: string;
    data: ActionGetResponse;
    metadata: ActionMetadata;
}