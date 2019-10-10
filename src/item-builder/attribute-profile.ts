import { AttributeTypes as x, AttributeTypes } from '../rooms/types'

export interface IAttributeProfilesIndex {
  [index: string] : IAttributeProfile
}

export type IAttributeProfiles = IAttributeProfile[] & IAttributeProfilesIndex

export enum AttributeRestrictions {
  Weapon = 0,
  Bow = 1,
  AllWeapon = 2,
  Armor = 3,
  Ring = 4,
  Amulet = 5,
  Boots = 6,
  Glove = 7,
  Cap = 8,
  None = 9,
}

export interface IAttributeProfile {
  type: AttributeTypes
  cost: number 
  increaseValue: number
  restrictTo: AttributeRestrictions
  stackable: boolean
  basic: boolean
}

export const attributeProfiles : IAttributeProfiles = [] as any

addRestrictEffect(x.WeaponLifeSteal, AttributeRestrictions.Weapon)
addRestrictEffect(x.WeaponEmitsSpirits, AttributeRestrictions.Weapon)
addRestrictEffect(x.WeaponKnockback, AttributeRestrictions.Weapon, 1, 2)
addRestrictEffect(x.WeaponFairyFire, AttributeRestrictions.Weapon)
addRestrictEffect(x.WeaponSlowStrike, AttributeRestrictions.Weapon)
addRestrictEffect(x.WeaponBlink, AttributeRestrictions.Weapon, 3)
addRestrictEffect(x.WeaponLightning, AttributeRestrictions.Weapon, 3)
addRestrictEffect(x.WeaponMidas, AttributeRestrictions.Weapon, 2)
addRestrictEffect(x.WeaponSplashAttack, AttributeRestrictions.Weapon, 2)
addRestrictEffect(x.WeaponStrongPoison, AttributeRestrictions.Weapon)
addRestrictEffect(x.WeaponPoisonCoat, AttributeRestrictions.Weapon, 0)

addRestrictEffect(x.AllWeaponBurn, AttributeRestrictions.AllWeapon, 0)
addRestrictEffect(x.AllWeaponFreeze, AttributeRestrictions.AllWeapon, 0)
addRestrictEffect(x.AllWeaponShock, AttributeRestrictions.AllWeapon, 0)

addRestrictEffect(x.BowWeightless, AttributeRestrictions.Bow, 0)
addRestrictEffect(x.BowLight, AttributeRestrictions.Bow, 0)
addRestrictEffect(x.BowTrajectory, AttributeRestrictions.Bow, 0)
addRestrictEffect(x.BowMulti, AttributeRestrictions.Bow, 1)
addRestrictEffect(x.BowHomingArrow, AttributeRestrictions.Bow, 1)

addEffect(x.Berserk)
addEffect(x.DoubleJump)
addEffect(x.TrippleJump)
addEffect(x.FireWalk, 0)
addEffect(x.Bouncy, 0)
addEffect(x.SuperSpeed)
addEffect(x.GrabWalls, 0)
addEffect(x.ThrowHard)
addEffect(x.FamiliarShooter)
addEffect(x.FamiliarHealer)
addEffect(x.FamiliarMelee) 
addEffect(x.HeavySink, 0)
addEffect(x.JumpHigh, 0, 1)
addEffect(x.WalkChargeDamage, 0)
addEffect(x.BreathUnderWater, 0)
addEffect(x.FeatherFall)
addEffect(x.LightFeet)
addEffect(x.PhaseVertical)
addEffect(x.PhaseHorizontal)
addEffect(x.Merchant, 2)
addEffect(x.BoulderProtection)
addEffect(x.SlowAura, 0)
addEffect(x.FreezeAura, 0)
addEffect(x.FlameAura, 0)
addEffect(x.Greedy)
addEffect(x.HeavyPunch)
addEffect(x.Archery)
addEffect(x.CoinHeal)
addEffect(x.BurnReflect, 0)
addEffect(x.ShockReflect, 0)
addEffect(x.FreezeReflect, 0)
addEffect(x.PoisonReflect, 0)
addEffect(x.DamageReflect, 0)
addEffect(x.SpiritsReflect, 0)
addEffect(x.MistReflect, 0)
addEffect(x.SpikeProtection)
addEffect(x.FlappyJump)
addEffect(x.RepulseAttackers)
addEffect(x.ProjectileDeflection)
addEffect(x.FamiliarMaster, 2)
addEffect(x.Zygox, 1)
addEffect(x.Seltioc, 1)
addEffect(x.GodCurse, 2)
addEffect(x.TrueSight)

addStackable(x.LightRadius, 0, 1)
addStackable(x.Slaying, 2, 1)
addStackable(x.ReachUpgrade, 0, 4)
addStackable(x.JumpDamage, 0, 5)

addRestrictEffect(x.ArmorDA, AttributeRestrictions.Armor, 1)
addRestrictEffect(x.ArmorMagicShield, AttributeRestrictions.Armor, 1)
addRestrictEffect(x.AmuletReincarnate, AttributeRestrictions.Amulet, 1)
addRestrictEffect(x.BootsFireJump, AttributeRestrictions.Boots, 1)
addRestrictEffect(x.CapSpellCost, AttributeRestrictions.Cap, 1)
addRestrictEffect(x.GloveExplosionAffinity, AttributeRestrictions.Glove, 1)
addRestrictEffect(x.RingChestSpirits, AttributeRestrictions.Ring, 1)
addRestrictEffect(x.RingChestHeal, AttributeRestrictions.Ring, 1)

addBasic(x.Str)
addBasic(x.Dex)
addBasic(x.Vit)
addBasic(x.Spd, 2)
addBasic(x.Int)
addBasic(x.Luk)
addBasic(x.Def, 2)

addStackable(x.ResistAll, 2, 1)
addStackable(x.ResistCold)
addStackable(x.ResistFire)
addStackable(x.ResistElec)
addStackable(x.ResistPoison)

function add(attr: IAttributeProfile) {
  attributeProfiles[attr.type] = attr
  attributeProfiles.push(attr)
}

function addStackable(type: x, cost = 1, value = 1) {
  add({
    type,
    cost,
    increaseValue: value,
    basic: false,
    restrictTo: AttributeRestrictions.None,
    stackable: true,
  })
}

function addBasic(type: x, increaseValue: number = 1) {
  add({
    type,
    increaseValue,
    cost: 1,
    basic: true,
    restrictTo: AttributeRestrictions.None,
    stackable: true,
  })
}

function addEffect(type: x, cost = 1, value = 0) {
  add({
    type,
    cost,
    increaseValue: value,
    basic: false,
    restrictTo: AttributeRestrictions.None,
    stackable: false,
  })
}

function addRestrictEffect(type: x, restrictTo: AttributeRestrictions, cost = 1, value = 0) {
  add({
    type,
    cost,
    restrictTo,
    increaseValue: value,
    basic: false,
    stackable: false,
  })
}
