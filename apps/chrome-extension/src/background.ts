chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('on message', msg, sender);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }

  if (!msg.wallet) return false;
  handleWalletCommunication(sender.tab.id, msg.type, msg.wallet, msg.payload)
    .then((res) => {
      sendResponse(res);
    })
    .catch((err) => {
      console.error('error handling message', err);
    });

  return true;
});

async function handleWalletCommunication(
  tabId: number,
  type: string,
  wallet: string,
  payload: object,
) {
  if (type === 'connect') {
    console.log('connecting wallet', wallet);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func:
        wallet === 'solflare'
          ? async () => {
              // @ts-ignore
              const provider = window.solflare;
              const res = await provider.connect();
              return provider.publicKey.toString();
            }
          : async () => {
              // @ts-ignore
              const provider = window.solana;
              const res = await provider.connect();
              return res.publicKey.toString();
            },
    });
    return res[0].result;
  } else if (type === 'sign_message') {
    // @ts-ignore
    console.log('signing message', payload.message);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async (message: string) => {
        const provider =
          // @ts-ignore
          wallet === 'solflare' ? window.solflare : window.solana;
        const textToSign = new TextEncoder().encode(message);
        const res = await provider.signMessage(textToSign);
        return res;
      },
      // @ts-ignore
      args: [payload.message, wallet],
    });
    return res[0].result;
  } else if (type === 'sign_transaction') {
    // @ts-ignore
    console.log('signing transaction', wallet, payload.txData);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async (transaction: string, wallet) => {
        try {
          const res =
            wallet === 'solflare'
              ? // @ts-ignore
                await window.solflare.request({
                  method: 'signAndSendTransaction',
                  params: {
                    transaction,
                  },
                })
              : // @ts-ignore
                await window.solana.request({
                  method: 'signAndSendTransaction',
                  params: {
                    message: transaction,
                  },
                });
          console.log('result', res);
          return res;
        } catch (e: any) {
          console.log('error', e);
          return { error: e.message ?? 'Unknown error' };
        }
      },
      // @ts-ignore
      args: [base58.encode(Buffer.from(payload.txData, 'base64')), wallet],
    });
    return res[0].result;
  }
}
