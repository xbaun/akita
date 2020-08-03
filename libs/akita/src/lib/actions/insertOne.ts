import { EntityOf, EntityStore } from '../entityStore';
import { StateOf } from '../store';
import { Action } from './core/action';
import { ActionArgsOf, ActionOf, Commit, newCommitType } from './core/commit';
import { EntityStoreUtils } from './utils/entityStoreUtils';

export const InsertOneType = 'INSERT_ONE' as const;

export class InsertOne<TStore extends EntityStore> extends Commit<TStore, Action<typeof InsertOneType, (entity: EntityOf<TStore>) => void>> {
  static type = InsertOneType;

  static Type = <TStore extends EntityStore>() => newCommitType<InsertOne<TStore>>(InsertOneType);

  constructor(...args: ActionArgsOf<InsertOne<TStore>>) {
    super({ type: InsertOne.type, args });
  }

  reduce({ args: [entity] }: ActionOf<this>, state: StateOf<TStore>, store: TStore): StateOf<TStore> {
    return EntityStoreUtils.insertMany(store, state, [entity]);
  }
}

/**
 * Insert one entity.
 */
export function insertOne<TStore extends EntityStore>(...args: ActionArgsOf<InsertOne<TStore>>) {
  return new InsertOne(...args);
}
