export const host =
    process.env.VITE_DFX_NETWORK === "ic"
        ? "https://icp0.io"
        : "http://127.0.0.1:4943";

export const provider =
    process.env.VITE_DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";

export const ICP_BLINK_PREFIX = /^(icp-action:|icp:)/;
