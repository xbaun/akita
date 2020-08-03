import { StateOf, Store } from '../../store';
import { Action } from './action';

export type ActionOf<TCommit extends Commit<any, any>> = TCommit['action'];

export type ActionArgsOf<TCommit extends Commit<any, any>> = Parameters<ActionOf<TCommit>['__ARGS__']>;

export abstract class Commit<TStore extends Store, TAction extends Action = Action> {
  static type?: string = undefined;

  __STORE__!: TStore;

  protected constructor(readonly action: TAction) {}

  abstract reduce(action: TAction, state: StateOf<TStore>, store: TStore): StateOf<TStore>;
}

export interface CommitType<TCommit extends Commit<any, any>> {
  type: TCommit['action']['type'];
  // @internal
  __COMMIT__: TCommit;
}

export function newCommitType<TCommit extends Commit<any, any>>(type: TCommit['action']['type']) {
  return { type } as CommitType<TCommit>;
}
