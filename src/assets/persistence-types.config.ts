/** Types of files supported by the data manager service */
export const PERSISTENCE_TYPES = {
  /** Individual magic items */
  magicItem: 'greg-magic-item',
  /** Rollable lists of magic items */
  magicItemTable: 'greg-magic-item-table',
  /** A singular reference to a weapon power */
  magicWeaponPower: 'greg-weapon-power',
  /** Configurable lists of weapon powers: notably Sword-only in TSR editions */
  magicWeaponPowerTable: 'greg-weapon-power-table',
  /** A collection of monsters encounterable at random and rollable to generate */
  monsterEncounterList: 'greg-monster-encounter-list',
  /** A singular monster entity */
  monsterType: 'greg-monster-type',
  /** Treasure article entries for use in Treasure Types */
  treasureArticle: 'greg-treasure-article',
  /** Rollable table of configured treasure types */
  treasureList: 'greg-treasure-list',
  /** Configurations for generating treasure maps: including maps to magic items */
  treasureMap: 'greg-treasure-map',
  /** Reference entries specific to a treasure map: gold, silver, etc. */
  treasureMapRef: 'greg-treasure-map-ref',
  /** Groupings of treasure articles and references to be associated with monsters or hoards */
  treasureType: 'greg-treasure-type',
};
