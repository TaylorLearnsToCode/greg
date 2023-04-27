import {
  AbstractControl,
  FormArray,
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

/**
 * Moves the control at a specified index one step up or down in a target form array.
 *
 * @param  {number} index
 * @param  {string} direction Accepts "up" or "down": case sensitive.
 * @param  {FormArray} target
 */
export function shiftFormArrayEntry(
  index: number,
  direction: string,
  target: FormArray
): void {
  let newIndex: number;
  switch (direction) {
    case 'up':
      newIndex = index - 1;
      break;
    case 'down':
      newIndex = index + 1;
      break;
    default:
      throw new Error(`Unsupported direction ${direction} specified.`);
  }
  if (newIndex === -1 || newIndex === target.controls.length) {
    return;
  }
  const targetControl = target.at(index);
  target.removeAt(index);
  target.insert(newIndex, targetControl);
}

/* -- begin "private" support functions -- */

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
