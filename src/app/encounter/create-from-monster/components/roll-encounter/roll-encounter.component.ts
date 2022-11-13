import { Component, OnInit } from '@angular/core';
import { EncounterListEntry } from '@encounter/create-from-monster/model/encounter-list-entry';
import { EncounterFromMonsterControllerService } from '@encounter/create-from-monster/services/encounter-from-monster-controller/encounter-from-monster-controller.service';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { WwwMonster } from '@shared/model/www-monster.model';
import { rollDice } from '@shared/utilities/dice-roller/dice-roller.util';
import { Observable } from 'rxjs';

@Component({
  selector: 'greg-roll-encounter',
  templateUrl: './roll-encounter.component.html',
  styleUrls: ['./roll-encounter.component.scss'],
})
export class RollEncounterComponent implements OnInit {
  diceToRoll$: Observable<DiceRolled>;
  encounterList$: Observable<EncounterListEntry[]>;
  monsterName: string = '~';
  noEncountered: number = 0;

  constructor(
    private controllerService: EncounterFromMonsterControllerService
  ) {}

  ngOnInit(): void {
    this.diceToRoll$ = this.controllerService.diceToRoll$;
    this.encounterList$ = this.controllerService.encounterList$;
  }

  rollEncounter(
    encounterList: EncounterListEntry[],
    diceToRoll: DiceRolled
  ): void {
    const roll: number = rollDice(diceToRoll);
    encounterList.sort((a, b) => a.range.high - b.range.low);
    const monster: WwwMonster = encounterList.find(
      (encounter) => roll >= encounter.range.low && roll <= encounter.range.high
    ).encounter;

    this.noEncountered = rollDice(monster.noAppearing);
    this.monsterName = monster.name;
  }
}
