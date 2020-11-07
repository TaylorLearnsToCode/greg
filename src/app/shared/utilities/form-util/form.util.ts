import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { doesExist } from '../common-util/common.util';

/**
 * For a provided object, returns an AbstractControl based on the object type:
 * * Arrays will return FormArray
 * * Object not of Array or Date type will return FormGroup
 * * Any other input will return FormControl
 * @param  {any} obj
 */
export function buildFormFromObject(obj: any): AbstractControl {
  obj = doesExist(obj) ? obj : '';
  if (Array.isArray(obj)) {
    return buildFormArrayFromArray(obj);
  } else if (obj instanceof Map) {
    const formObj = {};
    for (const key of obj.keys()) {
      formObj[key] = obj.get(key);
    }
    return buildFormGroupFromObject(formObj);
  } else if (typeof obj === 'object' && !(obj instanceof Date)) {
    return buildFormGroupFromObject(obj);
  } else {
    return new FormControl(obj);
  }
}

/**
 * For a provided array, returns a FormArray populated by AbstractControls according
 * to the array's contents.
 * @param  {any[]} array
 */
function buildFormArrayFromArray(array: any[]): FormArray {
  const formArray = new FormArray([]);
  array.forEach((element) => formArray.push(buildFormFromObject(element)));
  return formArray;
}

/**
 * For a provided object, returns a FormGroup populated by AbstractControls according
 * to the object's properties and their values.
 * @param  {any} obj
 */
function buildFormGroupFromObject(obj: any): FormGroup {
  const formGroup = new FormGroup({});
  Object.keys(obj).forEach((key) =>
    formGroup.addControl(key, buildFormFromObject(obj[key]))
  );
  return formGroup;
}
