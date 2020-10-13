import { Route } from '@angular/router';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { MenuItem } from '@shared/model/menu-item.model';
import { Monster } from '@shared/model/monster.model';
import { SaveAs, SaveAsClass } from '@shared/model/save-as.model';
import { getTestRoute } from '@test/route.mock';
import {
  formValueToDiceRolled,
  formValueToMonster,
  formValueToSaveAs,
  routeToMenuItem,
} from './conversion.util';

describe('ConversionUtil', () => {
  describe('routeToMenuItem', () => {
    let constantMenuItem: MenuItem;
    let parentRoute: Route;
    let route: Route;
    let variableMenuItem: MenuItem;

    beforeEach(() => {
      constantMenuItem = new MenuItem('', '');
      route = getTestRoute();
      parentRoute = getTestRoute('parent-path', [route]);
      variableMenuItem = undefined;
    });

    it('should return a MenuItem', () => {
      constantMenuItem.id = route.path;
      constantMenuItem.label = route.path;
      constantMenuItem.routerLink = `/${route.path}`;
      variableMenuItem = routeToMenuItem(route);
      expect(variableMenuItem).toEqual(constantMenuItem);
    });

    it('should return a MenuItem with children', () => {
      constantMenuItem.id = parentRoute.path;
      constantMenuItem.label = parentRoute.path;
      constantMenuItem.routerLink = `/${parentRoute.path}`;
      constantMenuItem.children = [routeToMenuItem(route)];
      variableMenuItem = routeToMenuItem(parentRoute);
      expect(variableMenuItem).toEqual(constantMenuItem);
    });
  });

  describe('formValueToDiceRolled', () => {
    let constantDiceRolled: DiceRolled;
    let formValue: {};
    let variableDiceRolled: DiceRolled;

    beforeEach(() => {
      constantDiceRolled = null;
      formValue = null;
      variableDiceRolled = null;
    });

    it('should convert a form value (object) to a dice rolled', () => {
      formValue = {
        no: 1,
        pips: 6,
        modifier: 1,
        multiplier: 2,
      };
      constantDiceRolled = new DiceRolled(1, 6, 1, 2);
      variableDiceRolled = formValueToDiceRolled(formValue);
      expect(variableDiceRolled).not.toBe(constantDiceRolled);
      expect(variableDiceRolled).toEqual(constantDiceRolled);
    });

    it('should be missing-property safe', () => {
      formValue = {};
      constantDiceRolled = new DiceRolled(null, null);
      variableDiceRolled = formValueToDiceRolled(formValue);
      expect(variableDiceRolled).not.toBe(constantDiceRolled);
      expect(variableDiceRolled).toEqual(constantDiceRolled);
    });
  });

  describe('formValueToSaveAs', () => {
    let constantSaveAs: SaveAs;
    let formValue: {};
    let variableSaveAs: SaveAs;

    beforeEach(() => {
      constantSaveAs = null;
      formValue = null;
      variableSaveAs = null;
    });

    it('should convert a form value to a save as', () => {
      formValue = {
        asClass: SaveAsClass.MU,
        level: 2,
      };
      constantSaveAs = new SaveAs(SaveAsClass.MU, 2);
      variableSaveAs = formValueToSaveAs(formValue);
      expect(variableSaveAs).not.toBe(constantSaveAs);
      expect(variableSaveAs).toEqual(variableSaveAs);
    });

    it('should be missing-property safe', () => {
      formValue = {};
      constantSaveAs = new SaveAs();
      variableSaveAs = formValueToSaveAs(formValue);
      expect(variableSaveAs).not.toBe(constantSaveAs);
      expect(variableSaveAs).toEqual(variableSaveAs);
    });
  });

  describe('formValueToMonster', () => {
    let constantMonster: Monster;
    let formValue: {};
    let variableMonster: Monster;

    beforeEach(() => {
      constantMonster = null;
      formValue = null;
      variableMonster = null;
    });

    it('should convert a form value to a monster', () => {
      formValue = {
        alignment: 'L',
        armorClass: 6,
        attacks: 'Eat',
        damage: new DiceRolled(2, 10),
        frequency: 'Rare',
        hitDice: 4,
        hitPointModifier: 4,
        morale: 8,
        movementExploration: 90,
        name: 'Grue',
        noDungeon: new DiceRolled(1, 1),
        notes: 'Grue are only encountered in the dark.',
        noWilderness: new DiceRolled(1, 1),
        pctInLair: 100,
        saveAs: new SaveAs(SaveAsClass.FTR, 6),
        treasureTypeCarried: 'Nil',
        treasureTypeLair: 'Nil',
      };
      constantMonster = new Monster();
      constantMonster.alignment = 'L';
      constantMonster.armorClass = 6;
      constantMonster.attacks = 'Eat';
      constantMonster.damage = new DiceRolled(2, 10);
      constantMonster.frequency = 'Rare';
      constantMonster.hitDice = 4;
      constantMonster.hitPointModifier = 4;
      constantMonster.morale = 8;
      constantMonster.movementExploration = 90;
      constantMonster.name = 'Grue';
      constantMonster.noDungeon = new DiceRolled(1, 1);
      constantMonster.notes = 'Grue are only encountered in the dark.';
      constantMonster.noWilderness = new DiceRolled(1, 1);
      constantMonster.pctInLair = 100;
      constantMonster.saveAs = new SaveAs(SaveAsClass.FTR, 6);
      constantMonster.treasureTypeCarried = 'Nil';
      constantMonster.treasureTypeLair = 'Nil';
      variableMonster = formValueToMonster(formValue);
      expect(variableMonster).not.toBe(constantMonster);
      expect(variableMonster).toEqual(constantMonster);
    });

    it('should be missing-property safe', () => {
      formValue = {};
      constantMonster = new Monster();
      variableMonster = formValueToMonster(formValue);
      expect(variableMonster).not.toBe(constantMonster);
      expect(variableMonster).toEqual(constantMonster);
    });
  });
});
