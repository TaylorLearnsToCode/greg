import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

/**
 * For a provided object, returns an AbstractControl based on the object type:
 * * Arrays will return FormArray
 * * Object not of Array or Date type will return FormGroup
 * * Any other input will return FormControl
 * @param  {any} obj
 */
export function buildFormFromObject(obj: any): AbstractControl {
  if (Array.isArray(obj)) {
    return buildFormArrayFromArray(obj);
  } else if (typeof obj === 'object' && !(obj instanceof Date)) {
    return buildFormGroupFromObject(obj);
  } else {
    return new FormControl(obj);
  }
}

function buildFormArrayFromArray(array: any[]): FormArray {
  const formArray = new FormArray([]);
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
