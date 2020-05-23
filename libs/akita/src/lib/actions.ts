import { isNil } from './isNil';
import { IDS } from './types';

export interface StoreSnapshotAction {
  type: string | null;
  entityIds: IDS[] | null;
  skip: boolean;
  payload: any;
}

export const currentAction = {
  type: null,
  entityIds: null,
  skip: false,
  payload: null,
};

let customActionActive = false;

export function resetCustomAction() {
  customActionActive = false;
}

// public API for custom actions. Custom action always wins
export function logAction(type: string, entityIds?, payload?) {
  setAction(type, entityIds, payload);
  customActionActive = true;
}

export function setAction(type: string, entityIds?, payload?) {
  if (customActionActive === false) {
    currentAction.type = type;
    currentAction.entityIds = entityIds;
    currentAction.payload = payload;
  }
}

export function setSkipAction(skip = true) {
  currentAction.skip = skip;
}

export function action(action: string, entityIds?, payload?) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
      logAction(action, entityIds, isNil(payload) ? args : payload);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
