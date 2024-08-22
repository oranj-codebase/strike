export const host =
  import.meta.env.VITE_DFX_NETWORK === "ic"
    ? "https://icp0.io"
    : "http://127.0.0.1:4943";

export const provider =
  import.meta.env.VITE_DFX_NETWORK === "ic"
    ? "https://identity.ic0.app"
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";
