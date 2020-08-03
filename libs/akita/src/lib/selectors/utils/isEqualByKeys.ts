/**
 * Performs a deep compare on object keys to check if two objects are equal.
 */
export function isEqualByKeys(a?: Object, b?: Object): boolean {
  // Test if a and b are equal by identity
  if (a === b) {
    return true;
  }

  // Test whether a or b is not an object type, then at least one is a primitive value
  // and not equal to the other, otherwise the previous test would be true.
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // Test if both are arrays or not, otherwise an empty object ({}) would be equal
  // to an empty array ([]).
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const aKeys = Object.keys(a) as (keyof typeof a)[];
  const bKeys = Object.keys(b) as (keyof typeof b)[];

  // If a new property or element (for an array) was added, then they are not equal.
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // Both have the same count of keys, test that all values are equal.
  return aKeys.every((aKey) => isEqualByKeys(a[aKey], b[aKey]));
}
