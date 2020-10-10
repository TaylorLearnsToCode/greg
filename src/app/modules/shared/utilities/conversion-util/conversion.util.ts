import { Route } from '@angular/router';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { SaveAs } from '@shared/model/save-as.model';
import { MenuItem } from '../../model/menu-item.model';
import { RouteLabels } from '../../utilities/navigation-config/navigation-config.util';
import { doesExist } from '../common-util/common.util';

/**
 * Converts a provided Route to a MenuItem with label.
 * Any child routes are likewise converted recursively.
 * @param  {Route} route
 */
export function routeToMenuItem(route: Route): MenuItem {
  return new MenuItem(
    route.path,
    doesExist(RouteLabels[route.path]) ? RouteLabels[route.path] : route.path,
    route.children
      ? route.children.map((childRoute) => routeToMenuItem(childRoute))
      : [],
    false,
    `/${route.path}`
  );
}

/**
 * Converts the value of a FormGroup created from a DiceRolled object
 * into a proper DiceRolled instance.
 * @param  {any} formValue
 */
export function formValueToDiceRolled(formValue: any): DiceRolled {
  const diceRolled = new DiceRolled(0, 0);
  diceRolled.no = doesExist(formValue.no) ? formValue.no : diceRolled.no;
  diceRolled.pips = doesExist(formValue.pips)
    ? formValue.pips
    : diceRolled.pips;
  diceRolled.modifier = doesExist(formValue.modifier)
    ? formValue.modifier
    : diceRolled.modifier;
  diceRolled.multiplier = doesExist(formValue.multiplier)
    ? formValue.multiplier
    : diceRolled.multiplier;
  return diceRolled;
}

/**
 * Converts the value of a FormGroup created from a SaveAs object into
 * a proper SaveAs instance.
 * @param  {any} formValue
 */
export function formValueToSaveAs(formValue: any): SaveAs {
  const saveAs = new SaveAs();
  saveAs.asClass = doesExist(formValue.saveAs)
    ? formValue.saveAs
    : saveAs.asClass;
  saveAs.level = doesExist(formValue.level) ? formValue.level : saveAs.level;
  return saveAs;
}

/**
 * Converts the value of a FormGroup created from a Monster
 * into a proper Monster instance.
 * @param  {any} formValue
 */
export function formValueToMonster(formValue: any): Monster {
  const monster = new Monster();
  monster.alignment = doesExist(formValue.alignment)
    ? formValue.alignment
    : monster.alignment;
  monster.armorClass = doesExist(formValue.armorClass)
    ? formValue.armorClass
    : monster.armorClass;
  monster.attacks = doesExist(formValue.attacks)
    ? formValue.attacks
    : monster.attacks;
  monster.damage = doesExist(formValue.damage)
    ? formValueToDiceRolled(formValue.damage)
    : monster.damage;
  monster.frequency = doesExist(formValue.frequency)
    ? formValue.frequency
    : monster.frequency;
  monster.hitDice = doesExist(formValue.hitDice)
    ? formValue.hitDice
    : monster.hitDice;
  monster.morale = doesExist(formValue.morale)
    ? formValue.morale
    : monster.morale;
  monster.movementExploration = doesExist(formValue.movementExploration)
    ? formValue.movementExploration
    : monster.movementExploration;
  monster.name = doesExist(formValue.name) ? formValue.name : monster.name;
  monster.noDungeon = doesExist(formValue.noDungeon)
    ? formValueToDiceRolled(formValue.noDungeon)
    : monster.noDungeon;
  monster.notes = doesExist(formValue.notes) ? formValue.notes : monster.notes;
  monster.noWilderness = doesExist(formValue.noWilderness)
    ? formValueToDiceRolled(formValue.noWilderness)
    : monster.noWilderness;
  monster.pctInLair = doesExist(formValue.pctInLair)
    ? formValue.pctInLair
    : monster.pctInLair;
  monster.saveAs = doesExist(formValue.saveAs)
    ? formValueToSaveAs(formValue.saveAs)
    : monster.saveAs;
  monster.treasureTypeCarried = doesExist(formValue.treasureTypeCarried)
    ? formValue.treasureTypeCarried
    : monster.treasureTypeCarried;
  monster.treasureTypeLair = doesExist(formValue.treasureTypeLair)
    ? formValue.treasureTypeLair
    : monster.treasureTypeLair;
  return monster;
}
