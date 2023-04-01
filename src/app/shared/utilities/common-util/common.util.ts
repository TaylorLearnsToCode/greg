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
 * @param  {T} item
 * @param  {T[]} collection
 * @param {string} identifier optional: default 'name'
 */
export function insertOrReplace<T>(
  item: T,
  collection: T[],
  identifier?: string
): void {
  const id: string = identifier == undefined ? 'name' : identifier;
  const index: number = collection.findIndex(
    (c) => (c as any)[id] == (item as any)[id]
  );
  if (index !== -1) {
    collection.splice(index, 1, item);
  } else {
    collection.push(item);
  }
}
