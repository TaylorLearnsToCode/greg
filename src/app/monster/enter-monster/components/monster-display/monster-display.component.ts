import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MonsterControllerService } from '@monster/enter-monster/services/monster-controller/monster-controller.service';
import {
  ManEquivalence,
  WeaponEquivalence,
  WwwMonster,
} from '@shared/model/www-monster.model';
import { doesExist } from '@shared/utilities/common-util/common.util';
import { BehaviorSubject, Observable } from 'rxjs';

/** Presenter element for showing a monster object. UNDER CONSTRUCTION. */
@Component({
  selector: 'greg-monster-display',
  templateUrl: './monster-display.component.html',
  styleUrls: ['./monster-display.component.scss'],
})
export class MonsterDisplayComponent implements OnInit {
  monster$: Observable<WwwMonster[]>;
  shouldImport$: Observable<boolean>;
  private shouldImportSource: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  @ViewChild('fileInput')
  importButton: ElementRef;

  /** MonsterDisplayComponent Constructor */
  constructor(private monsterController: MonsterControllerService) {}

  /** Initializer Method */
  ngOnInit(): void {
    this.monster$ = this.monsterController.monster$;
    this.shouldImport$ = this.shouldImportSource.asObservable();
  }

  checkShouldImport(): void {
    this.shouldImportSource.next(
      doesExist(this.importButton) &&
        this.importButton.nativeElement.value != ''
    );
  }

  defendsAsDisplay(defense: ManEquivalence): string {
    return `${defense.no} ${defense.troopType} ${
      defense.cavalry ? ' Cavalry' : ''
    }`;
  }

  exportMonsters(): void {
    this.monsterController.exportMonsters();
  }

  importMonsters(): void {
    this.monsterController.importMonsters(
      this.importButton.nativeElement.files[0]
    );
  }

  weaponDisplay(weapons: WeaponEquivalence[]): string {
    let equivalences: number[] = [];
    let types: string[] = [];
    for (let weapon of weapons) {
      equivalences.push(weapon.no);
      types.push(weapon.type);
    }
    return `${equivalences.join('/')} men (${types.join('/')})`;
  }
}
