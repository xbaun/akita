import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { EntityState, getEntityType, getIDType, ID } from '../types';
import { remember } from './utils/rxjs/remember';

/**
 *
 * Select an entity from the store by id.
 *
 * @example
 *  store.state$.pipe(selectOne(2)).subscribe(v => {})
 */
export function selectOne<S extends EntityState<EntityType, IdType>, EntityType = getEntityType<S>, IdType extends ID = getIDType<S>>(id: IdType) {
  return (source: Observable<S>) =>
    source.pipe(
      map((state) => state.entities[id]),
      distinctUntilChanged()
    );
}
