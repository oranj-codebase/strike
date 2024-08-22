import { Actor, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

export const candidToJS = async (candid_source: string) => {
  // call didjs canister
  const didjs_interface: IDL.InterfaceFactory = ({ IDL }) =>
    IDL.Service({
      did_to_js: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    });

  const candidCanister = `a4gq6-oaaaa-aaaab-qaa4q-cai`;

  const agent = new HttpAgent({ host: 'https://icp-api.io' });

  const didjs = Actor.createActor(didjs_interface, {
    agent,
    canisterId: candidCanister,
  });
  const js: any = await didjs.did_to_js(candid_source);
  if (Array.isArray(js) && js.length === 0) {
    return undefined;
  }
  return js[0];
};

// export const fetchCandid = async (canisterId: string, agent: HttpAgent) => {

// };
