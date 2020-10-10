import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { buildFormFromObject } from './form.util';

describe('FormUtil', () => {
  let testControl: AbstractControl;

  beforeEach(() => {
    testControl = null;
  });

  describe('buildFormFromObject', () => {
    it('should default to empty FormControl', () => {
      testControl = buildFormFromObject(null);
      expect(testControl instanceof FormControl).toBeTrue();
      expect((testControl as FormControl).value).toEqual('');
    });

    it('should return a FormControl from a primitive', () => {
      const primitiveString = 'string';
      testControl = buildFormFromObject(primitiveString);
      expect(testControl instanceof FormControl).toBeTrue();
      expect((testControl as FormControl).value).toEqual(primitiveString);
    });

    it('should return a FormControl for a date', () => {
      const date = new Date();
      testControl = buildFormFromObject(date);
      expect(testControl instanceof FormControl).toBeTrue();
      expect((testControl as FormControl).value).toEqual(date);
    });

    it('should return a FormGroup for an object', () => {
      const obj = {
        firstField: 'first',
        secondField: 'second',
      };
      testControl = buildFormFromObject(obj);
      expect(testControl instanceof FormGroup).toBeTrue();
      expect((testControl as FormGroup).get('firstField').value).toEqual(
        obj.firstField
      );
      expect((testControl as FormGroup).get('secondField').value).toEqual(
        obj.secondField
      );
    });

    it('should return a FormArray for an array', () => {
      const arr = ['one', 'two'];
      testControl = buildFormFromObject(arr);
      expect(testControl instanceof FormArray).toBeTrue();
      expect((testControl as FormArray).controls[0].value).toEqual('one');
      expect((testControl as FormArray).controls[1].value).toEqual('two');
    });
  });
});
