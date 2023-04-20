/**
 * Performs a deep-clone of a provided object: such that the object is new (not
 * a reference) and all of its properties are likewise new.
 *
 * @param  {any} obj
 * @returns A deep copy of the provided object
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
 * Populates a provided object with properties from a provided argument.
 * Mutates argument object!
 *
 * @param  {object} thisObject - typically "this"
 * @param  {object} propertyArgument
 */
export function constructInstance(
  thisObject: object,
  propertyArgument: object
): void {
  if (doesExist(propertyArgument)) {
    Object.keys(propertyArgument).forEach((key) => {
      if (doesExist((thisObject as any)[key])) {
        (thisObject as any)[key] = (propertyArgument as any)[key];
      }
    });
  }
}

/**
 * Determines if a provided object exists.
 *
 * @param  {any} object
 * @returns True, if the provided object is neither NULL nor undefined
 */
export function doesExist(object: any): boolean {
  return object != null && object != undefined;
}

/**
 * If the provided item is found in the provided collection, matched by the
 * provided identifier, the item will update itself, replacing the old index.
 * Otherwise, the item will be pushed to the end of the collection.
 *
 * If more than one identifier is necessary, a comma delimited string is accepted.
 *
 * @param  {T} item
 * @param  {T[]} collection
 * @param {string} identifier optional: default 'name'
 */
export function insertOrReplace<T>(
  item: T,
  collection: T[],
  identifier?: string
): void {
  const ids: string[] =
    identifier == undefined ? ['name'] : identifier.split(',');
  let index: number = findIndexMatchingAllKeys(item, collection, ids);
  if (index !== -1) {
    collection.splice(index, 1, item);
  } else {
    collection.push(item);
  }
}

/**
 * Returns whether or not the provided object is defined, but empty.
 * * An empty array is defined as an array with no entries
 * * An empty string is defined as a string with no characters
 *
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
 * Removes the target item from the target collection based on the provided identifier.
 * Comma-delimited identifers are supported if multiple fields are to be checked.
 *
 * @param  {T} item
 * @param  {T[]} collection
 * @param  {string} identifier optional: default 'name'
 */
export function removeOrWarn<T>(
  item: T,
  collection: T[],
  identifier?: string
): void {
  const ids: string[] =
    identifier == undefined ? ['name'] : identifier.split(',');
  let index: number = findIndexMatchingAllKeys(item, collection, ids);
  if (index != -1) {
    collection.splice(index, 1);
  } else {
    console.warn(`Item ${(item as any)[ids[0]]} was not found to remove.`);
  }
}

/**
 * Searches a provided collection for an object in the collection which has fields and values
 * in common with a provided single item. If so, returns the index of that matching entry:
 * otherwise, returns -1.
 *
 * @param  {T} item
 * @param  {T[]} collection
 * @param  {string[]} conditions
 */
function findIndexMatchingAllKeys<T>(
  item: T,
  collection: T[],
  conditions: string[]
): number {
  let index: number = -1;
  for (let i = 0; i < collection.length; i++) {
    const idsMatch: boolean[] = [];
    let t: T;
    for (const id of conditions) {
      t = collection[i];
      idsMatch.push(
        doesExist((t as any)[id]) &&
          doesExist((item as any)[id]) &&
          (t as any)[id] === (item as any)[id]
      );
    }
    if (!idsMatch.some((matchValue) => !matchValue)) {
      index = i;
      break;
    }
  }
  return index;
}

/**
 * Returns TRUE if an array a is neither NULL nor UNDEFINED but contains
 * 0 entries within it.
 *
 * @param  {any[]} a
 */
function isArrayEmpty(a: any[]): boolean {
  return doesExist(a) && a.length === 0;
}

/**
 * Returns TRUE if a string s is neither NULL nor UNDEFINED but does
 * have a length of 0.
 *
 * @param  {string} s
 */
function isStringEmpty(s: string): boolean {
  return doesExist(s) && s.length === 0;
}
