import { AttributeTypes } from '../rooms/types'
import { attributeProfiles, AttributeRestrictions, IAttributeProfile } from './attribute-profile'
import { nextItemFactory, INextOf } from '../manipulators/next-item-factory'
import { createLotteryPicker } from '../tools/create-lottery-picker'

export interface AttributesByRestrictTo {
  [index: string]: IAttributeProfile[]
}

export interface NextAttributeByRestrictTo {
  [index: string]: INextOf<IAttributeProfile>
}


export const stackableAttributes = attributeProfiles
  .filter(x => x.stackable && x.restrictTo === AttributeRestrictions.None)

export const basicAttributes = attributeProfiles
  .filter(x => x.basic)

export const valueOneStackableAttribute = attributeProfiles
  .filter(x => x.stackable && x.cost === 1)

export const effectAttributes = attributeProfiles
  .filter(x => !x.stackable && !x.basic)

export const nonRestrictToEffectAttributes = effectAttributes
  .filter(x => x.restrictTo === AttributeRestrictions.None)

export const weaponEffectAttributes = effectAttributes
  .filter(
    x => x.restrictTo === AttributeRestrictions.AllWeapon || 
    x.restrictTo === AttributeRestrictions.Weapon)
    
export const bowEffectAttributes = effectAttributes
    .filter(
      x => x.restrictTo === AttributeRestrictions.Bow || 
      x.restrictTo === AttributeRestrictions.AllWeapon)

export const otherRangedEffectAttributes = effectAttributes
  .filter(x => x.restrictTo === AttributeRestrictions.AllWeapon)

export const nextStackableAttribute = lottery(stackableAttributes)
export const nextBasicAttribute = lottery(basicAttributes)
export const nextValueOneStackableAttribute = lottery(valueOneStackableAttribute)

export const nextNonRestrictToEffectAttribute = lottery(nonRestrictToEffectAttributes)

export const nextWeaponEffectAttributes = createLotteryPicker<IAttributeProfile>({
  weapon: {
    proportion: 15,
    possibilities: weaponEffectAttributes.filter(
      x => x.type !== AttributeTypes.WeaponBlink),
  },
  blink: {
    proportion: 1,
    possibilities: weaponEffectAttributes.filter(
      x => x.type === AttributeTypes.WeaponBlink),
  },
  others: {
    proportion: 1,
    possibilities: nonRestrictToEffectAttributes,
  },
})

export const nextBowEffectAttribute = createLotteryPicker({
  weapon: {
    proportion: 15,
    possibilities: bowEffectAttributes,
  },
  others: {
    proportion: 1,
    possibilities: nonRestrictToEffectAttributes,
  },
})

export const nextOtherRangedEffectAttribute = createLotteryPicker({
  weapon: {
    proportion: 10,
    possibilities: otherRangedEffectAttributes,
  },
  others: {
    proportion: 1,
    possibilities: nonRestrictToEffectAttributes,
  },
})


// generics 
export const restrictAttributesByType : AttributesByRestrictTo = {}
export const nextAttributeByRestrictTo : NextAttributeByRestrictTo = {} 

for (const index in AttributeRestrictions) {
  const restriction = <any>AttributeRestrictions[index] as AttributeRestrictions

  restrictAttributesByType[index] = effectAttributes.filter(
    x => x.restrictTo === restriction,
  )

  nextAttributeByRestrictTo[index] = lottery([
    ...restrictAttributesByType[index],
    ...nonRestrictToEffectAttributes,
  ])
}

function lottery<T>(items: T[]) {
  return createLotteryPicker({
    restrict: {
      possibilities: items,
      proportion: 4,
    },
  })
}
