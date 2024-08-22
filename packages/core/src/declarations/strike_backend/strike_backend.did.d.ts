import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'Ok' : null } |
  { 'Err' : string };
export interface StrikeRegistry {
  'status' : StrikeStatus,
  'website_url' : [] | [string],
  'canister_id' : Principal,
  'added_by' : Principal,
  'created_at' : bigint,
  'module_hash' : [] | [string],
}
export type StrikeStatus = { 'Blocked' : null } |
  { 'Submitted' : null } |
  { 'Trusted' : null };
export interface _SERVICE {
  'add_admin' : ActorMethod<[Principal], Result>,
  'add_registry' : ActorMethod<
    [Principal, [] | [string], [] | [string]],
    Result
  >,
  'get_strike_by_canister_id' : ActorMethod<[Principal], [] | [StrikeRegistry]>,
  'is_admin' : ActorMethod<[Principal], boolean>,
  'remove_admin' : ActorMethod<[Principal], Result>,
  'update_registry_status' : ActorMethod<[Principal, StrikeStatus], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
