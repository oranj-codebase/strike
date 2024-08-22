import { Actor, HttpAgent, type ActorConfig } from '@dfinity/agent';

import { Principal } from '@dfinity/principal';
import type {
  _SERVICE,
  StrikeRegistry,
  StrikeStatus,
} from '../declarations/strike_backend/strike_backend.did.d.ts';
import { idlFactory } from '../declarations/strike_backend/strike_backend.did.js';
import type { Action } from './Action/Action.ts';

export class ActionsRegistry {
  public static async lookup(
    agent: HttpAgent,
    canisterId: string,
    actorConfig?: ActorConfig,
  ): Promise<RegisteredEntity | null> {
    if (agent.isLocal()) {
      await agent.fetchRootKey();
    }

    const actor = Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: 'eh7xy-aaaaa-aaaak-ak2wq-cai',
      ...actorConfig,
    });
    const registry = await actor.get_strike_by_canister_id(
      Principal.fromText(canisterId),
    );

    if (registry.length === 0) {
      return null;
    }

    return castStrikeRegistry2RegisteredEntity(registry[0]);
  }
}

export interface RegisteredEntity {
  canisterId: string;
  state: ActionState;
  /** the principal of action owner */
  addedBy: string;
  createdAt: Date;
  moduleHash: string | null;
  websiteUrl: string | null;
}

export type ActionState = 'submitted' | 'trusted' | 'malicious' | 'notfound';

export const mergeActionStates = (...states: ActionState[]): ActionState => {
  if (states.includes('malicious')) {
    return 'malicious';
  }

  if (states.includes('notfound')) {
    return 'notfound';
  }

  return 'trusted';
};

export const getActionState = async (
  action: Action,
  actorConfig?: ActorConfig,
): Promise<ActionState> => {
  const state =
    (
      await ActionsRegistry.lookup(
        action.adapter.agent,
        action.canisterId,
        actorConfig,
      )
    )?.state ?? 'notfound';

  return state;
};

const castStrikeStatusEnum2State = (status: StrikeStatus): ActionState => {
  if ('Blocked' in status) {
    return 'malicious';
  }
  if ('Trusted' in status) {
    return 'trusted';
  }
  if ('Submitted' in status) {
    return 'submitted';
  }
  return 'notfound';
};

const castStrikeRegistry2RegisteredEntity = (
  registry: StrikeRegistry,
): RegisteredEntity => {
  return {
    canisterId: registry.canister_id.toText(),
    state: castStrikeStatusEnum2State(registry.status),
    createdAt: new Date(Number(registry.created_at) / 1000000), // registy.created_at is in nanoseconds
    addedBy: registry.added_by.toText(),
    moduleHash: registry.module_hash[0] ?? null,
    websiteUrl: registry.website_url[0] ?? null,
  };
};
