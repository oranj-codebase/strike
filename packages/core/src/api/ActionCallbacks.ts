import { Action } from './Action';
import type { ActionState } from './ActionsRegistry';

export interface ActionCallbacksConfig {
  onActionMount: (action: Action, state: ActionState) => void;
}
