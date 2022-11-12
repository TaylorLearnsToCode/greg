import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MonsterControllerService } from '@monster/enter-monster/services/monster-controller/monster-controller.service';
import {
  ManEquivalence,
  WeaponEquivalence,
  WwwMonster,
} from '@shared/model/www-monster.model';
import { BehaviorSubject, Observable } from 'rxjs';

/** Presenter element for showing a monster object. UNDER CONSTRUCTION. */
@Component({
  selector: 'greg-monster-display',
  templateUrl: './monster-display.component.html',
  styleUrls: ['./monster-display.component.scss'],
})
export class MonsterDisplayComponent implements OnInit {
  monster$: Observable<WwwMonster[]>;
  removeMode$: Observable<boolean>;

  @ViewChild('fileInput')
  importButton: ElementRef;

  private checkedMonsters: number[] = [];
  private removeModeSource: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private get removeMode(): boolean {
    return this.removeModeSource.value;
  }

  /** MonsterDisplayComponent Constructor */
  constructor(private monsterController: MonsterControllerService) {}

  /** Initializer Method */
  ngOnInit(): void {
    this.monster$ = this.monsterController.monster$;
    this.removeMode$ = this.removeModeSource.asObservable();
  }

  clearMonsters(): void {
    this.monsterController.clearMonsters();
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
    this.importButton.nativeElement.value = '';
  }

  removeSelectedMonsters(): void {
    this.monsterController.removeMonstersAt(this.checkedMonsters);
    this.toggleRemoveMonsters();
  }

  toggleCheckedMonsterAt(index: number): void {
    const selectedIndex = this.checkedMonsters.indexOf(index);
    if (selectedIndex < 0) {
      this.checkedMonsters.push(index);
    } else {
      this.checkedMonsters.splice(selectedIndex, 1);
    }
  }

  toggleRemoveMonsters(): void {
    if (this.removeMode) {
      this.checkedMonsters = [];
    }
    this.removeModeSource.next(!this.removeMode);
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
