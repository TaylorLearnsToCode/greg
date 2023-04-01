import { SUPPORTED_SYSTEMS } from '@assets/supported-systems.config';
import { constructInstance } from '@shared/utilities/common-util/common.util';
import { ReferenceEntry } from '../dao/reference-entry.model';
import { Rollable } from '../framework/rollable.model';

/** A collection of magic items which can be rolled against to generate one or more. */
export class MagicItemTable extends Rollable {
  entries: ReferenceEntry[] = [];
  /** Human readable identifier for the magic item table. */
  name: string = '';
  /** Game system for which the table is designed. */
  system: SUPPORTED_SYSTEMS = '' as SUPPORTED_SYSTEMS;

  constructor(table?: any) {
    super();
    constructInstance(this, table);
  }
}
