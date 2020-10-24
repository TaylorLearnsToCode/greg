import { Route } from '@angular/router';
import { DiceRolled } from '@shared/model/dice-rolled.model';
import { Monster } from '@shared/model/monster.model';
import { SaveAs } from '@shared/model/save-as.model';
import { Weapon } from '@shared/model/weapon.model';
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
 * @param  {any} value
 */
export function formValueToDiceRolled(value: any): DiceRolled {
  const diceRolled = new DiceRolled(null, null);
  diceRolled.no = doesExist(value.no) ? value.no : diceRolled.no;
  diceRolled.pips = doesExist(value.pips) ? value.pips : diceRolled.pips;
  diceRolled.modifier = doesExist(value.modifier)
    ? value.modifier
    : diceRolled.modifier;
  diceRolled.multiplier = doesExist(value.multiplier)
    ? value.multiplier
    : diceRolled.multiplier;
  return diceRolled;
}

/**
 * Converts the value of a FormGroup created from a SaveAs object into
 * a proper SaveAs instance.
 * @param  {any} value
 */
export function formValueToSaveAs(value: any): SaveAs {
  const saveAs = new SaveAs();
  saveAs.asClass = doesExist(value.asClass) ? value.asClass : saveAs.asClass;
  saveAs.level = doesExist(value.level) ? value.level : saveAs.level;
  return saveAs;
}

/**
 * Converts the value of a FormGroup created from a Monster
 * into a proper Monster instance.
 * @param  {any} value
 */
export function formValueToMonster(value: any): Monster {
  const monster = new Monster();
  monster.alignment = doesExist(value.alignment)
    ? value.alignment
    : monster.alignment;
  monster.armorClass = doesExist(value.armorClass)
    ? value.armorClass
    : monster.armorClass;
  monster.attacks = doesExist(value.attacks)
    ? value.attacks.map((attack: any) => formValueToWeapon(attack))
    : monster.attacks;
  monster.frequency = doesExist(value.frequency)
    ? value.frequency
    : monster.frequency;
  monster.hitDice = doesExist(value.hitDice) ? value.hitDice : monster.hitDice;
  monster.hitPointModifier = doesExist(value.hitPointModifier)
    ? value.hitPointModifier
    : monster.hitPointModifier;
  monster.morale = doesExist(value.morale) ? value.morale : monster.morale;
  monster.movementExploration = doesExist(value.movementExploration)
    ? value.movementExploration
    : monster.movementExploration;
  monster.name = doesExist(value.name) ? value.name : monster.name;
  monster.noDungeon = doesExist(value.noDungeon)
    ? formValueToDiceRolled(value.noDungeon)
    : monster.noDungeon;
  monster.notes = doesExist(value.notes) ? value.notes : monster.notes;
  monster.noWilderness = doesExist(value.noWilderness)
    ? formValueToDiceRolled(value.noWilderness)
    : monster.noWilderness;
  monster.pctInLair = doesExist(value.pctInLair)
    ? value.pctInLair
    : monster.pctInLair;
  monster.saveAs = doesExist(value.saveAs)
    ? formValueToSaveAs(value.saveAs)
    : monster.saveAs;
  monster.treasureTypeCarried = doesExist(value.treasureTypeCarried)
    ? value.treasureTypeCarried
    : monster.treasureTypeCarried;
  monster.treasureTypeLair = doesExist(value.treasureTypeLair)
    ? value.treasureTypeLair
    : monster.treasureTypeLair;
  return monster;
}

/**
 * Converts the value of a FormGroup created from a Weapon object into
 * a proper Weapon instance.
 * @param  {any} value
 */
export function formValueToWeapon(value: any): Weapon {
  const weapon = new Weapon();
  weapon.name = doesExist(value.name) ? value.name : weapon.name;
  weapon.damage = doesExist(value.damage)
    ? formValueToDiceRolled(value.damage)
    : weapon.damage;
  return weapon;
}
