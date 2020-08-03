import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { EntityState, getEntityType, getIDType, ID } from '../types';

/**
 *
 * Select many entities from the store by a predicate function.
 *
 * @example
 *  store.state$.pipe(selectManyFn(entity => entity.enabled))
 */
export function selectManyFn<S extends EntityState<EntityType, IdType>, EntityType = getEntityType<S>, IdType extends ID = getIDType<S>>(predicate: (entity: EntityType) => boolean) {
  return (source: Observable<S>) =>
    source.pipe(
      map((state) => state.ids.filter((id) => predicate(state.entities[id])).map((id) => state.entities[id])),
      distinctUntilChanged()
    );
}
