import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PERSISTENCE_TYPES } from '@assets/persistence-types.config';
import { ReferenceEntry } from '@shared/model/framework/reference-entry.model';
import { MagicItem } from '@shared/model/treasure/magic-item.model';
import { TreasureMap } from '@shared/model/treasure/treasure-map.model';
import { DataManagerService } from '@shared/services/data-manager/data-manager.service';
import { buildFormFromObject } from '@shared/utilities/form-util/form.util';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'greg-configure-treasure-map',
  templateUrl: './configure-treasure-map.component.html',
  styleUrls: ['./configure-treasure-map.component.scss'],
})
export class ConfigureTreasureMapComponent implements OnInit {
  magicItemList$: Observable<MagicItem[]>;
  treasureMapForm: FormGroup;

  private readonly PERSISTENCE_TYPES = PERSISTENCE_TYPES;

  constructor(private dataService: DataManagerService) {}

  ngOnInit(): void {
    this.magicItemList$ = this.dataService.dataState$.pipe(
      map((state) => state.magicItems)
    );
    this.treasureMapForm = buildFormFromObject(new TreasureMap()) as FormGroup;
  }

  /**
   * Adds a specified magic item to the treasure map's entries list
   * @param  {MagicItem} magicItem
   */
  addMagicItem(magicItem: MagicItem): void {
    (this.treasureMapForm.get('entries') as FormArray).push(
      buildFormFromObject(
        new ReferenceEntry({
          reference: magicItem.name,
          persistenceType: this.PERSISTENCE_TYPES.magicItem,
        } as ReferenceEntry)
      )
    );
  }

  /**
   * Shifts the magic item at the specified index in the saved magic items list one
   * position in the specified direction.
   *
   * @param  {number} index
   * @param  {string} direction Accepts "up" or "down"
   */
  shiftMagicItem(index: number, direction: string): void {
    this.dataService.shiftListEntry(
      this.PERSISTENCE_TYPES.magicItem,
      index,
      direction
    );
  }
}
