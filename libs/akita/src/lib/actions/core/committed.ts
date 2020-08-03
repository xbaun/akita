import { Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StateOf, Store } from '../../store';
import { Action } from './action';
import { Commit, CommitType } from './commit';

export interface Committed<TStore extends Store, TAction extends Action = Action> {
  __STORE__: TStore;
  action: TAction;
  state: StateOf<TStore>;
}

export function ofType<C extends Committed<any, any>, A1 extends Action, A2 extends Action, A3 extends Action, A4 extends Action>(
  c1: CommitType<Commit<C['__STORE__'], A1>>,
  c2: CommitType<Commit<C['__STORE__'], A2>>,
  c3: CommitType<Commit<C['__STORE__'], A3>>,
  c4: CommitType<Commit<C['__STORE__'], A4>>
): OperatorFunction<C, Committed<C['__STORE__'], A1> | Committed<C['__STORE__'], A2> | Committed<C['__STORE__'], A3> | Committed<C['__STORE__'], A4>>;
export function ofType<C extends Committed<any, any>, A1 extends Action, A2 extends Action, A3 extends Action>(
  c1: CommitType<Commit<C['__STORE__'], A1>>,
  c2: CommitType<Commit<C['__STORE__'], A2>>,
  c3: CommitType<Commit<C['__STORE__'], A3>>
): OperatorFunction<C, Committed<C['__STORE__'], A1> | Committed<C['__STORE__'], A2> | Committed<C['__STORE__'], A3>>;
export function ofType<C extends Committed<any, any>, A1 extends Action, A2 extends Action>(
  c1: CommitType<Commit<C['__STORE__'], A1>>,
  c2: CommitType<Commit<C['__STORE__'], A2>>
): OperatorFunction<C, Committed<C['__STORE__'], A1> | Committed<C['__STORE__'], A2>>;
export function ofType<C extends Committed<any, any>, A1 extends Action>(c1: CommitType<Commit<C['__STORE__'], A1>>): OperatorFunction<C, Committed<C['__STORE__'], A1>>;
export function ofType<C extends Committed<any, any>>(...commits: CommitType<C['__STORE__']>[]): OperatorFunction<C, Committed<C['__STORE__'], Action>> {
  return (source: Observable<Committed<any, any>>) => source.pipe(filter(({ action: { type } }) => commits.some((commit) => commit.type === type)));
}
