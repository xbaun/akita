import { StateOf, Store } from '../store';
import { Action } from './core/action';
import { ActionArgsOf, ActionOf, Commit, newCommitType } from './core/commit';

export const UpdateType = 'UPDATE' as const;

export class Update<TStore extends Store> extends Commit<TStore, Action<typeof UpdateType, (state: Partial<StateOf<TStore>>) => void>> {
  static type = UpdateType;

  static Type = <TStore extends Store>() => newCommitType<Update<TStore>>(UpdateType);

  constructor(...args: ActionArgsOf<Update<TStore>>) {
    super({ type: Update.type, args });
  }

  reduce({ args: [newState] }: ActionOf<this>, oldState: StateOf<TStore>, store: TStore): StateOf<TStore> {
    return { ...oldState, ...newState };
  }
}

/**
 * Update store with a new state.
 */
export function update<TStore extends Store>(...args: ActionArgsOf<Update<TStore>>) {
  return new Update(...args);
}
