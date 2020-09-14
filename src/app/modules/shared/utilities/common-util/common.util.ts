/**
 * Returns TRUE if an array a is neither NULL nor UNDEFINED and contains
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
  } else {
    return isStringEmpty(obj);
  }
}
