/**
 * For any two objects, returns TRUE if all properties and sub-properties, recursively, match.
 * @param  {any} first
 * @param  {any} second
 */
export function areEqual(first: any, second: any): boolean {
  if (
    (!doesExist(first) && doesExist(second)) ||
    (doesExist(first) && !doesExist(second))
  ) {
    return false;
  } else if (!doesExist(first) && !doesExist(second)) {
    return true;
  } else if (Array.isArray(first) && Array.isArray(second)) {
    return areArraysEqual(first, second);
  } else if (first instanceof Date && second instanceof Date) {
    return first.valueOf() === second.valueOf();
  } else if (typeof first === 'object' && typeof second === typeof first) {
    return areObjectsEqual(first, second);
  } else {
    return first === second;
  }
}

/**
 * Performs a deep-clone of a provided object: such that the object is new (not
 * a reference) and all of its properties are likewise new.
 * @param  {any} obj
 */
export function cloneObject(obj: any): any {
  let retObj: any;
  if (!doesExist(obj)) {
    return null;
  } else if (Array.isArray(obj)) {
    retObj = [];
    obj.forEach((element) => retObj.push(cloneObject(element)));
  } else if (typeof obj === 'object' && !(obj instanceof Date)) {
    retObj = {};
    Object.keys(obj).forEach((key) => (retObj[key] = cloneObject(obj[key])));
  } else if (obj instanceof Date) {
    retObj = new Date(obj.valueOf());
  } else {
    retObj = obj;
  }
  return retObj;
}

/**
 * For any object, iterate through properties and Object.freeze each.
 * @param  {any} obj
 */
export function deepFreeze(obj: any): void {
  if (!doesExist(obj)) {
    return;
  } else if (Array.isArray(obj)) {
    obj.forEach((element) => deepFreeze(element));
  } else if (typeof obj === 'object' && !(obj instanceof Date)) {
    Object.keys(obj).forEach((key) => deepFreeze(obj[key]));
  }
  Object.freeze(obj);
}

/**
 * Returns TRUE if the provided object is neither NULL nor UNDEFINED.
 * @param  {any} obj
 */
export function doesExist(obj: any): boolean {
  return obj !== null && obj !== undefined;
}

/**
 * Returns whether or not the provided object is defined, but empty.
 * * An empty array is defined as an array with no entries
 * * An empty string is defined as a string with no characters
 * @param  {string|any[]} obj
 */
export function isEmpty(obj: string | any[]): boolean {
  if (Array.isArray(obj)) {
    return isArrayEmpty(obj);
  } else if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  } else {
    return isStringEmpty(obj);
  }
}

/**
 * Verifies that two objects have the same number of properties on their prototype
 * and then iterates through properties, verifying that the values assigned to each
 * property are likewise equivalent.
 * @param  {any} first
 * @param  {any} second
 */
function areObjectsEqual(first: any, second: any): boolean {
  const firstKeys = Object.keys(first);
  let equal = firstKeys.length === Object.keys(second).length;
  if (equal) {
    equal = !firstKeys.some((key) => !areEqual(first[key], second[key]));
  }
  return equal;
}

/**
 * Verifies that two provided arrays both have the same number of elements and
 * that each element is equivalent to a corresponding element at the same index
 * in its provided sister array.
 * @param  {any[]} first
 * @param  {any[]} second
 */
function areArraysEqual(first: any[], second: any[]): boolean {
  let equal = first.length === second.length;
  if (equal) {
    equal = !first.some((val, idx) => !areEqual(val, second[idx]));
  }
  return equal;
}

/**
 * Returns TRUE if an array a is neither NULL nor UNDEFINED but contains
 * 0 entries within it.
 * @param  {any[]} a
 */
function isArrayEmpty(a: any[]): boolean {
  return doesExist(a) && a.length === 0;
}

/**
 * Returns TRUE if a string s is neither NULL nor UNDEFINED but does
 * have a length of 0.
 * @param  {string} s
 */
function isStringEmpty(s: string): boolean {
  return doesExist(s) && s.length === 0;
}
