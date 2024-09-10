
let proxyUrl: string | null = 'https://proxy.dial.to';

export function proxify(url: string): URL {
    const baseUrl = new URL(url);
    if (shouldIgnoreProxy(baseUrl)) {
        return baseUrl;
    }
    const proxifiedUrl = new URL(proxyUrl!);
    proxifiedUrl.searchParams.set('url', url);
    return proxifiedUrl;
}

function shouldIgnoreProxy(url: URL): boolean {
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return true;
    }
    if (!proxyUrl) {
        return true;
    }
    return false;
}
