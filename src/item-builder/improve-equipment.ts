import { createLotteryPicker, ILottery, ILotteryNextOf } from '../tools/create-lottery-picker'
import { IItemEntity, IItemAttributes } from '../rooms/entities'
import { nextBasicAttribute } from './basic-lottery'
import { IAttributeProfile, attributeProfiles } from './attribute-profile'

import { 
  equipmentProfiles, IEquipmentProfile, EquipmentType, EquipmentSubType,
} from './equipment-profile'

import { INextOf } from '../manipulators/next-item-factory'

import { 
  nextNonRestrictToEffectAttribute, 
  nextWeaponEffectAttributes, 
  nextBowEffectAttribute, nextOtherRangedEffectAttribute, 
  nextAttributeByRestrictTo, 
  nextStackableAttribute,
} from './attributes-by-type'
import { deepClone } from '../tools/deep-clone'
import { AttributeTypes } from '../rooms/types'

enum AttrPickCommand {
  Stackable = 1,
  Effect = 2,
}



const nextEnhanceableAttribute = createLotteryPicker({
  basic: {
    proportion: 2,
    possibilities: [() => nextBasicAttribute()],
  },
  other: {
    proportion: 1,
    possibilities: [() => nextStackableAttribute()],
  },
})

export function improveEquipment(
  equip: IItemEntity, 
  actValue: number, 
  optConfig?: IImproveEquipConfig,
) {
  const config = optConfig ? optConfig : getDefaultConfig()

  if (!equip.attributes) equip.attributes = []

  equip.attributes = deepClone(equip.attributes)

  const nextStackableAttr = getEnhanceableAttrs(equip.attributes, config)
  const nextEffect = getPossibleEffects(equip)
  let currentEquipValue = 0

  const nextAttrCommand = getNextCommandPicker(config)

  while (currentEquipValue < actValue) {
    const command = nextAttrCommand()
    
    const attrToImprove = pickNextAttrToImprove(
      command, equip, nextEffect, currentEquipValue, actValue, nextStackableAttr)

    if (!attrToImprove) return 
    
    const attrCost = Math.max(config.minCost, attrToImprove.cost)

    if (currentEquipValue + attrCost > actValue) continue
    currentEquipValue += attrCost

    improveEquipmentWith(equip.attributes, attrToImprove)
  } 
}

function pickNextAttrToImprove(
  command: AttrPickCommand, 
  equip: IItemEntity, 
  nextEffect: INextOf<IAttributeProfile>, 
  currentEquipValue: number, 
  actValue: number, 
  nextStackableAttr: ILotteryNextOf<IAttributeProfile>
) {
  if (!equip.attributes) return

  if (command === AttrPickCommand.Effect) {
    return grabNextPossibleEffect(equip.attributes, nextEffect, currentEquipValue, actValue)
  }

  if (command === AttrPickCommand.Stackable) {
    return nextStackableAttr()
  }
  
  return null
}

function grabNextPossibleEffect(
  currentAttrs: IItemAttributes,
  next: INextOf<IAttributeProfile>, 
  currentEquipValue: number,
  maxValue: number,
) {

  while (true) { 
    const attr = next()

    if (currentEquipValue + attr.cost <= maxValue) {
      const alreadyHasAttr = !!currentAttrs.find(x => x[0] === attr.type)
      
      if (!alreadyHasAttr) return attr
    }
  }
}

function getPossibleEffects(equip: IItemEntity) {
  const equipProfile = equipmentProfiles[equip.itemType] 

  if (equipProfile === undefined) return nextNonRestrictToEffectAttribute

  return getPossibleEffectsByType(equipProfile)
}

function getPossibleEffectsByType(equip: IEquipmentProfile) {
  if (equip.type === EquipmentType.PrimaryWeapon) {
    return nextWeaponEffectAttributes
  }

  if (equip.subType === EquipmentSubType.Bow) {
    return nextBowEffectAttribute
  }

  if (equip.subType === EquipmentSubType.OtherRanged) {
    return nextOtherRangedEffectAttribute
  }

  if (equip.type === EquipmentType.Amulet) {
    return nextAttributeByRestrictTo[equip.type]
  }

  return nextNonRestrictToEffectAttribute
}

function getEnhanceableAttrs(allEquipAttrs: IItemAttributes, config: IImproveEquipConfig) {
  const equipsStackableAttrs = getStackableEquipAttrs(allEquipAttrs)
  const nextExtraAttrsToImprove = getExtraAttrsToImprovePicker(equipsStackableAttrs)

  nextExtraAttrsToImprove()

  const lottery : ILottery<IAttributeProfile> = {}

  if (config.addStackable) {
    lottery.extraStats = {
      proportion: 4,
      possibilities: nextExtraAttrsToImprove(),
    }
  }

  if (config.enhanceCurrentStats) {
    lottery.improveCurrentStats = {
      proportion: 6,
      possibilities: equipsStackableAttrs,
    }
  }

  return createLotteryPicker(lottery)
}

function getExtraAttrsToImprovePicker(
  equipStackableAttrs: IAttributeProfile[],
) {
  const lotteryConfig : ILottery<IAttributeProfile[]> = {}  
  const maxExtraAttrs = Math.max(3 - equipStackableAttrs.length, 1)

  for (let i = 0; i < maxExtraAttrs; i += 1) {
    const possibilities = []
    const attrsVarietyCount = i + 1

    for (let j = 0; j < attrsVarietyCount; j += 1) {
      const attr = nextEnhanceableAttribute()()
      possibilities.push(attr)
    }

    lotteryConfig[`extraAttr${i}`] = {
      possibilities: [possibilities],
      proportion: attrsVarietyCount,
    }
  }

  return createLotteryPicker(lotteryConfig)
} 

function getStackableEquipAttrs(equipAttrs: IItemAttributes) {
  return equipAttrs
    .filter((attr) => {
      const attrProfile = attributeProfiles[attr[0]]
      return attrProfile !== undefined && attrProfile.stackable
    })
    .map(attr => attributeProfiles[attr[0]])
}

function improveEquipmentWith(equipAttrs: IItemAttributes, attr: IAttributeProfile) {
  const equipAttr = equipAttrs.find(x => x[0] === attr.type)
  const levelupValue = attr.increaseValue

  if (equipAttr) {
    equipAttr[1] += levelupValue
    return 
  }

  equipAttrs.push([attr.type, levelupValue])
}

export interface IImproveEquipConfig {
  minCost: number
  addEffect: boolean
  addStackable: boolean
  enhanceCurrentStats: boolean
}

function getDefaultConfig() {
  return {
    minCost: 0,
    addEffect: true,
    addStackable: true,
    enhanceCurrentStats: true,
  }
}

function getNextCommandPicker(config: IImproveEquipConfig) {
  const commandLottery : ILottery<AttrPickCommand> = {}

  if (config.addStackable) { 
    commandLottery.stackableAttr = {
      proportion: 3,
      possibilities: [AttrPickCommand.Stackable],
    }
  }

  if (config.addEffect) {
    commandLottery.effectAttr = {
      proportion: 1,
      possibilities: [AttrPickCommand.Effect],
    }
  }

  return createLotteryPicker(commandLottery)
}
