import { ICP_BLINK_PREFIX } from './constants';

export type IsInterstitialResult =
  | {
      isInterstitial: true;
      decodedActionUrl: string;
    }
  | {
      isInterstitial: false;
    };

export function isInterstitial(url: string | URL): IsInterstitialResult {
  try {
    const urlObj = new URL(url);

    const actionUrl = urlObj.searchParams.get('url');
    if (!actionUrl) {
      return { isInterstitial: false };
    }
    const urlDecodedActionUrl = decodeURIComponent(actionUrl);

    if (!ICP_BLINK_PREFIX.test(urlDecodedActionUrl)) {
      return { isInterstitial: false };
    }

    const decodedActionUrl = urlDecodedActionUrl.replace(ICP_BLINK_PREFIX, '');

    // Validate the decoded action URL
    const decodedActionUrlObj = new URL(decodedActionUrl);

    return {
      isInterstitial: true,
      decodedActionUrl: decodedActionUrlObj.toString(),
    };
  } catch (e) {
    console.error(
      `[@dialectlabs/blinks] Failed to check if URL is interstitial: ${url}`,
      e,
    );
    return { isInterstitial: false };
  }
}
