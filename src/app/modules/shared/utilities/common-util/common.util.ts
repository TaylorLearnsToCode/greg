/**
 * Returns TRUE if the provided object is neither NULL nor UNDEFINED.
 * @param  {any} obj
 */
export function doesExist(obj: any): boolean {
  return obj !== null && obj !== undefined;
}

/**
 * Returns TRUE if a string s is neither NULL nor UNDEFINED but does
 * have a length of 0.
 * @param  {string} s
 */
export function isEmpty(s: string): boolean {
  return doesExist(s) && s.length === 0;
}
