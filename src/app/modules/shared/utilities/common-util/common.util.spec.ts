import { doesExist, isEmpty } from './common.util';

describe('CommonUtil', () => {
  describe('doesExist', () => {
    it('should return true for an object', () =>
      expect(doesExist({})).toBe(true));
    it('should return true for a primitive', () =>
      expect(doesExist(0)).toBe(true));
    it('should return true for falsy, but defined, object', () =>
      expect(doesExist('')).toBe(true));
    it('should return false when NULL', () =>
      expect(doesExist(null)).toBe(false));
    it('should return false when UNDEFINED', () =>
      expect(doesExist(undefined)).toBe(false));
  });

  describe('isEmpty', () => {
    it('should return true for an empty array', () =>
      expect(isEmpty([])).toBe(true));
    it('should return false for a non-empty array', () =>
      expect(isEmpty(['not', 'empty'])).toBe(false));

    it('should return true for an empty string', () =>
      expect(isEmpty('')).toBe(true));
    it('should return false for a non-empty string', () =>
      expect(isEmpty('not empty')).toBe(false));

    it('should return false for NULL', () => expect(isEmpty(null)).toBe(false));
    it('should return false for UNDEFNIED', () =>
      expect(isEmpty(undefined)).toBe(false));
  });
});
