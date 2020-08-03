import { EntityIdOf, EntityOf, EntityStore } from '../entityStore';
import { StateOf } from '../store';
import { Action } from './core/action';
import { ActionArgsOf, ActionOf, Commit, newCommitType } from './core/commit';
import { EntityStoreUtils } from './utils/entityStoreUtils';

export const RemoveManyByFnType = 'REMOVE_MANY_BY_FN' as const;

export class RemoveManyByFn<TStore extends EntityStore> extends Commit<TStore, Action<typeof RemoveManyByFnType, (predicate: (id: EntityIdOf<TStore>, entity: EntityOf<TStore>) => boolean) => void>> {
  static type = RemoveManyByFnType;

  static Type = <TStore extends EntityStore>() => newCommitType<RemoveManyByFn<TStore>>(RemoveManyByFnType);

  constructor(...args: ActionArgsOf<RemoveManyByFn<TStore>>) {
    super({ type: RemoveManyByFn.type, args });
  }

  reduce({ args: [predicate] }: ActionOf<this>, state: StateOf<TStore>, store: TStore): StateOf<TStore> {
    const ids = (Object.keys(state.entities) as EntityIdOf<TStore>[]).filter(predicate);

    // If no entity id is found, then return the current state.
    if (ids.length === 0) {
      return state;
    }

    return EntityStoreUtils.removeMany(store, state, ids);
  }
}

/**
 * Remove one entity.
 */
export function removeManyByFn<TStore extends EntityStore>(...args: ActionArgsOf<RemoveManyByFn<TStore>>) {
  return new RemoveManyByFn(...args);
}
