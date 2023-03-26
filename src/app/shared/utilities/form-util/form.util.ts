import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormArray,
} from '@angular/forms';
import { doesExist } from '../common-util/common.util';

/**
 * Provided any object, simple or complex, returns an AbstractControl to represent that object.
 * * Primitives are returned as FormControl with default value equal to the property value
 * * Lists are returned as UntypedFormArray, populated by controls according to their values
 * * Objects with keys are returned as a FormGroup, with each property converted to a control as above
 * * Maps are treated as Objects in { Map.key: Map.value } format
 * * Dates are unsupported
 *
 * @param  {any} obj
 * @returns FormGroup, FormControl, or UntypedFormArray, depending on context: but requires a cast
 */
export function buildFormFromObject(obj: any): AbstractControl {
  obj = doesExist(obj) ? obj : '';
  if (Array.isArray(obj)) {
    return buildFormArrayFromArray(obj);
  } else if (obj instanceof Map) {
    const formObj: any = {};
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

function buildFormArrayFromArray(array: any[]): UntypedFormArray {
  const formArray = new UntypedFormArray([]);
  array.forEach((element) => formArray.push(buildFormFromObject(element)));
  return formArray;
}

function buildFormGroupFromObject(obj: any): FormGroup {
  const formGroup = new FormGroup({});
  Object.keys(obj).forEach((key) =>
    formGroup.addControl(key, buildFormFromObject(obj[key]))
  );
  return formGroup;
}
