import {
  areEqual,
  cloneObject,
  deepFreeze,
  doesExist,
  isEmpty,
} from './common.util';

describe('CommonUtil', () => {
  const milis = Date.UTC(38, 7, 27);

  describe('areEqual', () => {
    it('should return false if a param is missing or null', () => {
      expect(areEqual(null, {})).toBeFalse();
      expect(areEqual({}, null)).toBeFalse();
      expect(areEqual(undefined, {})).toBeFalse();
      expect(areEqual({}, undefined)).toBeFalse();
      expect(areEqual('', '')).toBeTrue();
    });
    it('should return true if both params are missing or null', () => {
      expect(areEqual(null, null)).toBeTrue();
      expect(areEqual(undefined, undefined)).toBeTrue();
      expect(areEqual(undefined, null)).toBeTrue();
    });
    it('should return true for an array or object', () => {
      const array1 = [1, { one: 1 }, [2, { two: 2 }]];
      const array2 = [1, { one: 1 }, [2, { two: 2 }]];
      expect(areEqual(array1, array2)).toBeTrue();
      expect(array1 === array2).toBeFalse();
    });
    it('should be smart about array lengths', () => {
      const array1 = [1, 2, 3];
      const array2 = [1, 2];
      expect(areEqual(array1, array2)).toBeFalse();
    });
    it('should be smart about object property counts', () => {
      const object1 = { one: 1, two: 2, three: 3 };
      const object2 = { one: 1, two: 2 };
      expect(areEqual(object1, object2)).toBeFalse();
    });
    it('should return true for Dates', () => {
      const date1 = new Date(milis);
      const date2 = new Date(milis);
      expect(areEqual(date1, date2)).toBeTrue();
      expect(date1 === date2).toBeFalse();
    });
  });

  describe('cloneObject', () => {
    it('should clone an array or object', () => {
      const array1 = [1, { one: 1 }, [2, { two: 2 }]];
      const array2: [] = cloneObject(array1);
      expect(array1).toEqual(array2);
      expect(array1).not.toBe(array2);
    });
    it('should clone a date', () => {
      const date1 = new Date(milis);
      const date2: Date = cloneObject(date1);
      expect(date1).toEqual(date2);
      expect(date1).not.toBe(date2);
    });
  });

  describe('deepFreeze', () => {
    it('should freeze an array or object and all its children or properties', () => {
      const array1: any[] = [1, { one: 1 }, [2, { two: 2 }]];
      deepFreeze(array1);
      expect(() => {
        array1[0] = 2;
      }).toThrowError();
      expect(() => {
        const obj = array1[1];
        obj.one = 2;
      }).toThrowError();
      expect(() => {
        const obj = array1[1];
        obj.newField = 2;
      }).toThrowError();
      expect(() => {
        const obj: any[] = array1[2];
        obj.push(1);
      }).toThrowError();
    });
    it('should be NULL safe', () => {
      let array1: any[];
      expect(() => deepFreeze(array1)).not.toThrowError();
      array1 = null;
      expect(() => deepFreeze(array1)).not.toThrowError();
    });
  });

  describe('doesExist', () => {
    it('should return true for an object', () =>
      expect(doesExist({})).toBeTrue());
    it('should return true for a primitive', () =>
      expect(doesExist(0)).toBeTrue());
    it('should return true for falsy, but defined, object', () =>
      expect(doesExist('')).toBeTrue());
    it('should return false when NULL', () =>
      expect(doesExist(null)).toBeFalse());
    it('should return false when UNDEFINED', () =>
      expect(doesExist(undefined)).toBeFalse());
  });

  describe('isEmpty', () => {
    it('should return true for an empty array', () =>
      expect(isEmpty([])).toBeTrue());
    it('should return false for a non-empty array', () =>
      expect(isEmpty(['not', 'empty'])).toBeFalse());

    it('should return true for an empty string', () =>
      expect(isEmpty('')).toBeTrue());
    it('should return false for a non-empty string', () =>
      expect(isEmpty('not empty')).toBeFalse());

    it('should return false for NULL', () => expect(isEmpty(null)).toBeFalse());
    it('should return false for UNDEFNIED', () =>
      expect(isEmpty(undefined)).toBeFalse());
  });
});
