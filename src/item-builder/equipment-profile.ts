import { AttributeTypes, ItemTypes } from '../rooms/types'
import { IItemAttributes } from '../rooms/entities'

export interface IEquipmentProfilesIndex {
  [index: string] : IEquipmentProfile
}

export type IEquipmentProfiles = IEquipmentProfile[] & IEquipmentProfilesIndex

export enum EquipmentType {
  PrimaryWeapon = 1,
  SecondaryWeapon = 2,
  Armor = 3,
  Ring = 4,
  Amulet = 5,
  Boots = 6,
  Glove = 7,
  Cap = 8,
}

export enum EquipmentSubType {
  Bow = 0,
  OtherRanged = 1,
  Sword = 2,
  Dagger = 3,
  Rod = 4,
  Caestus = 5,
  Club = 6,
  Axe = 7,
  Armor = 8,
  Accessory = 9,
}

export interface IEquipmentProfile {
  type: EquipmentType
  subType?: EquipmentSubType
  attributes: IItemAttributes
  itemType: ItemTypes
}

export const equipmentProfiles : IEquipmentProfiles = [] as any

addAmulet(ItemTypes.Kerchief)
addAmulet(ItemTypes.CrossAmulet, [[AttributeTypes.AmuletReincarnate, 0]])
addAmulet(ItemTypes.MonsterTooth)
addAmulet(ItemTypes.MagicStone, [[AttributeTypes.Luk, 1]])
addAmulet(ItemTypes.Compass, [[AttributeTypes.Str, 1]])
addAmulet(ItemTypes.BirdAmulet, [[AttributeTypes.Dex, 1]])
addAmulet(ItemTypes.FeatherTalisman, [[AttributeTypes.FeatherFall, 0]])
addAmulet(ItemTypes.Scarf, [[AttributeTypes.ResistCold, 1]])
addAmulet(ItemTypes.SkullNecklace, [[AttributeTypes.ResistPoison, 1]])
addAmulet(ItemTypes.Locket, [[AttributeTypes.Int, 1]])
addAmulet(ItemTypes.StuddedCollar, [[AttributeTypes.Def, 1]])
addAmulet(ItemTypes.ShrunkenHead, [[AttributeTypes.Int, 1]])
addAmulet(ItemTypes.LionTalisman, [[AttributeTypes.Str, 2]])
addAmulet(ItemTypes.PocketWatch, [[AttributeTypes.Spd, 2]])
addAmulet(ItemTypes.WiseManBeard, [[AttributeTypes.Int, 2]])
addAmulet(ItemTypes.Scarab, [[AttributeTypes.Luk, 2]])

addArmor(ItemTypes.BreastPlate)
addArmor(ItemTypes.TravelerTunic)
addArmor(ItemTypes.Robes)
addArmor(ItemTypes.AnimalSkin)
addArmor(ItemTypes.ReinforcedArmor, [[AttributeTypes.Def, 1]])
addArmor(ItemTypes.RangerUniform, [[AttributeTypes.Dex, 1]])
addArmor(ItemTypes.AcolyteRobes, [[AttributeTypes.Int, 1]])
addArmor(ItemTypes.DruidCloak, [[AttributeTypes.Luk, 1]])
addArmor(ItemTypes.FullPlateArmor, [[AttributeTypes.Def, 2]])
addArmor(ItemTypes.LeatherArmor, [[AttributeTypes.Spd, 1]])
addArmor(ItemTypes.HighPriestRobes, [[AttributeTypes.Int, 1], [AttributeTypes.Def, 1]])
addArmor(ItemTypes.BeserkerArmor, [[AttributeTypes.Berserk, 0], [AttributeTypes.Str, 1]])
addArmor(ItemTypes.HalfPlate, [[AttributeTypes.Dex, 1], [AttributeTypes.Def, 1]])
addArmor(ItemTypes.AssassinLeathers, [[AttributeTypes.Dex, 1], [AttributeTypes.Int, 1]])
addArmor(ItemTypes.ConjurerRobes, [[AttributeTypes.Int, 2]])
addArmor(ItemTypes.GoldPlate, [[AttributeTypes.Str, 1], [AttributeTypes.Def, 1]])

addCap(ItemTypes.WoodenHelm)
addCap(ItemTypes.OldHood)
addCap(ItemTypes.WizardHat, [[AttributeTypes.Int, 1]])
addCap(ItemTypes.BoarHead)
addCap(ItemTypes.StuddedHelm, [[AttributeTypes.Def, 1]])
addCap(ItemTypes.VagabondCap, [[AttributeTypes.Luk, 1]])
addCap(ItemTypes.BirdMask, [[AttributeTypes.Dex, 1]])
addCap(ItemTypes.RocHead, [[AttributeTypes.Spd, 1]])
addCap(ItemTypes.GreatHelm, [[AttributeTypes.Def, 1]])
addCap(ItemTypes.FlatCap, [[AttributeTypes.Luk, 1]])
addCap(ItemTypes.DemonMask, [[AttributeTypes.Str, 1]])
addCap(ItemTypes.WolfHead, [[AttributeTypes.Dex, 1]])
addCap(ItemTypes.RoyalCrown, [[AttributeTypes.Dex, 1], [AttributeTypes.Str, 1]])
addCap(ItemTypes.AssassinHood, [[AttributeTypes.Dex, 1], [AttributeTypes.Int, 1]])
addCap(ItemTypes.LunarCirclet, [[AttributeTypes.Int, 1], [AttributeTypes.ResistCold, 1]])
addCap(ItemTypes.DragonHead, [[AttributeTypes.ResistAll, 1]])

addBoots(ItemTypes.PageGreaves)
addBoots(ItemTypes.PeddlerBoots, [[AttributeTypes.Spd, 1]])
addBoots(ItemTypes.PeasantShoes)
addBoots(ItemTypes.FighterSandals)
addBoots(ItemTypes.MercenaryGreaves, [[AttributeTypes.Def, 1]])
addBoots(ItemTypes.HighwaymanBoots, [[AttributeTypes.Spd, 1]])
addBoots(ItemTypes.MageShoes, [[AttributeTypes.Int, 1]])
addBoots(ItemTypes.ColosseumClogs, [[AttributeTypes.Str, 1]])
addBoots(ItemTypes.KnightGreaves, [[AttributeTypes.Def, 1]])
addBoots(ItemTypes.BanditBoots, [[AttributeTypes.Luk, 1]])
addBoots(ItemTypes.WarlockShoes, [[AttributeTypes.Int, 1]])
addBoots(ItemTypes.SavageSandals, [[AttributeTypes.Str, 1]])
addBoots(ItemTypes.ChampionGreaves, [[AttributeTypes.Def, 2]])
addBoots(ItemTypes.AssassinBoots, [[AttributeTypes.Dex, 1], [AttributeTypes.Int, 1]])
addBoots(ItemTypes.WitchBoots, [[AttributeTypes.Int, 2]])
addBoots(ItemTypes.DragonSlayerBoots, [[AttributeTypes.Str, 1], [AttributeTypes.ResistFire, 1]])

addRing(ItemTypes.IncompleteRing)
addRing(ItemTypes.Ring, [[AttributeTypes.ResistCold, 1]])
addRing(ItemTypes.DamagedRing, [[AttributeTypes.ResistFire, 1]])
addRing(ItemTypes.GemStuddedRing, [[AttributeTypes.ResistElec, 1]])
addRing(ItemTypes.WoodRing, [[AttributeTypes.ResistPoison, 1]])
addRing(ItemTypes.LeafRing, [[AttributeTypes.Str, 1]])
addRing(ItemTypes.FlowerRing, [[AttributeTypes.Dex, 1]])
addRing(ItemTypes.SunRing, [[AttributeTypes.Vit, 1]])
addRing(ItemTypes.BoneRing, [[AttributeTypes.Spd, 1]])
addRing(ItemTypes.SkullRing, [[AttributeTypes.Luk, 1]])
addRing(ItemTypes.StarRing, [[AttributeTypes.Int, 1]])
addRing(ItemTypes.ShieldRing, [[AttributeTypes.Def, 1]])
addRing(ItemTypes.MisteryRing)
addRing(ItemTypes.SwordRing, [[AttributeTypes.FamiliarMelee, 1]])
addRing(ItemTypes.MoonRing)
addRing(ItemTypes.EyeRing)

addGloves(ItemTypes.PageGloves)
addGloves(ItemTypes.PeddlerMits, [[AttributeTypes.Luk, 1]])
addGloves(ItemTypes.ApprenticeGloves)
addGloves(ItemTypes.FighterGloves)
addGloves(ItemTypes.KnightGauntlets, [[AttributeTypes.Def, 1]])
addGloves(ItemTypes.ThiefGloves, [[AttributeTypes.Dex, 1]])
addGloves(ItemTypes.MysticGloves, [[AttributeTypes.Int, 1]])
addGloves(ItemTypes.GladiatorGloves, [[AttributeTypes.Str, 1], [AttributeTypes.Dex, 1]])
addGloves(ItemTypes.CrusaderGloves, [[AttributeTypes.Def, 1]])
addGloves(ItemTypes.RogueGloves, [[AttributeTypes.Dex, 1]])
addGloves(ItemTypes.VoodooGloves, [[AttributeTypes.Int, 1], [AttributeTypes.Luk, 1]])
addGloves(ItemTypes.SavageGloves, [[AttributeTypes.Str, 1]])
addGloves(ItemTypes.ChampionGauntlets, [[AttributeTypes.Def, 1], [AttributeTypes.Str, 1]])
addGloves(ItemTypes.MasterThiefGloves, [[AttributeTypes.Dex, 1], [AttributeTypes.Greedy, 0]])
addGloves(ItemTypes.SageGloves, [[AttributeTypes.Int, 2]])
addGloves(ItemTypes.DragonSlayerGloves, [[AttributeTypes.Str, 1], [AttributeTypes.ResistFire, 1]])

addPrimaryWeapon(ItemTypes.CopperSword, EquipmentSubType.Sword)
addPrimaryWeapon(ItemTypes.SteelSword, EquipmentSubType.Sword)
addPrimaryWeapon(ItemTypes.BroadSword, EquipmentSubType.Sword, [[AttributeTypes.Str, 1]])
// tslint:disable-next-line:max-line-length
addPrimaryWeapon(ItemTypes.DragonSlayer, EquipmentSubType.Sword, [[AttributeTypes.AllWeaponShock, 0], [AttributeTypes.AllWeaponBurn, 0]])
addPrimaryWeapon(ItemTypes.BoneSword, EquipmentSubType.Sword, [[AttributeTypes.Int, 1]])
addPrimaryWeapon(ItemTypes.Spear, EquipmentSubType.Sword, [[AttributeTypes.SwordMagicPogo, 0]])

addPrimaryWeapon(ItemTypes.Dagger, EquipmentSubType.Dagger)
addPrimaryWeapon(ItemTypes.Baselard, EquipmentSubType.Dagger)
addPrimaryWeapon(ItemTypes.GlassBlade, EquipmentSubType.Dagger, [[AttributeTypes.Dex, 1]])
addPrimaryWeapon(ItemTypes.BlinkDagger, EquipmentSubType.Dagger, [[AttributeTypes.WeaponBlink, 0]])

addPrimaryWeapon(ItemTypes.MagicRod, EquipmentSubType.Rod)
// tslint:disable-next-line:max-line-length
addPrimaryWeapon(ItemTypes.SpacerRod, EquipmentSubType.Rod, [[AttributeTypes.Int, 1], [AttributeTypes.Str, 1]])
addPrimaryWeapon(ItemTypes.WaveRod, EquipmentSubType.Rod, [[AttributeTypes.Int, 1]])

addPrimaryWeapon(ItemTypes.Caestus, EquipmentSubType.Caestus, [[AttributeTypes.WeaponKnockback, 1]])
addPrimaryWeapon(ItemTypes.Claw, EquipmentSubType.Caestus, [[AttributeTypes.Dex, 1]])
addPrimaryWeapon(ItemTypes.Qatar, EquipmentSubType.Caestus)

addPrimaryWeapon(ItemTypes.WoodenClub, EquipmentSubType.Club)
addPrimaryWeapon(ItemTypes.FlangedMace, EquipmentSubType.Club)
addPrimaryWeapon(ItemTypes.Hammer, EquipmentSubType.Club)
addPrimaryWeapon(ItemTypes.Bludgeon, EquipmentSubType.Club, [[AttributeTypes.WeaponLifeSteal, 0]])
// tslint:disable-next-line:max-line-length
addPrimaryWeapon(ItemTypes.MorningStart, EquipmentSubType.Club, [[AttributeTypes.Vit, 1]])
addPrimaryWeapon(ItemTypes.WarHammer, EquipmentSubType.Club, [[AttributeTypes.WeaponKnockback, 4]])
addPrimaryWeapon(ItemTypes.SpearheadedBaton, EquipmentSubType.Club)
addPrimaryWeapon(ItemTypes.Flail, EquipmentSubType.Club, [[AttributeTypes.WeaponSlowStrike, 0]])
// tslint:disable-next-line:max-line-length
addPrimaryWeapon(ItemTypes.ThunderGodsHammer, EquipmentSubType.Club, [[AttributeTypes.WeaponLightning, 0]])

addPrimaryWeapon(ItemTypes.WoodsmanAxe, EquipmentSubType.Axe, [[AttributeTypes.Str, 1]])
// tslint:disable-next-line:max-line-length
addPrimaryWeapon(ItemTypes.BattleAxe, EquipmentSubType.Axe, [[AttributeTypes.Berserk, 0], [AttributeTypes.Str, 1]])

addSecondaryWeapon(ItemTypes.ShortBow, EquipmentSubType.Bow, [[AttributeTypes.Luk, 1]])
addSecondaryWeapon(ItemTypes.LongBow, EquipmentSubType.Bow)
addSecondaryWeapon(ItemTypes.CrossBow, EquipmentSubType.Bow, [[AttributeTypes.Dex, 1]])
addSecondaryWeapon(ItemTypes.Boomerang, EquipmentSubType.OtherRanged)
addSecondaryWeapon(ItemTypes.EnchantedBoomerang, EquipmentSubType.OtherRanged)

function add(equip: IEquipmentProfile) {
  equipmentProfiles[equip.itemType] = equip
  equipmentProfiles.push(equip)
}

function addAmulet(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Amulet,
    subType: EquipmentSubType.Accessory,
  })
}

function addArmor(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Armor,
    subType: EquipmentSubType.Armor,
  })
}

function addCap(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Cap,
    subType: EquipmentSubType.Armor,
  })
}

function addBoots(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Boots,
    subType: EquipmentSubType.Armor,
  })
}

function addRing(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Ring,
    subType: EquipmentSubType.Accessory,
  })
}

function addGloves(itemType: ItemTypes, attributes: IItemAttributes = []) {
  add({
    itemType,
    attributes,
    type: EquipmentType.Glove,
    subType: EquipmentSubType.Armor,
  })
}

function addPrimaryWeapon(
  itemType: ItemTypes, 
  subType: EquipmentSubType, 
  attributes: IItemAttributes = []) {
  add({
    itemType,
    subType,
    attributes,
    type: EquipmentType.PrimaryWeapon,
  })
}


function addSecondaryWeapon(
  itemType: ItemTypes, 
  subType: EquipmentSubType, 
  attributes: IItemAttributes = []) {
  add({
    itemType,
    subType,
    attributes,
    type: EquipmentType.SecondaryWeapon,
  })
}
