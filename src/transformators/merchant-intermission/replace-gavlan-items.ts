import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { AttributeTypes, ItemTypes } from '../../rooms/types'
import { priceUp } from '../../item-builder/price-up'
import { equipmentProfiles, EquipmentSubType, EquipmentType } 
  from '../../item-builder/equipment-profile'
import { improveEquipAttr } from '../../item-builder/improve-equipment-attr'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { createUniqueLotteryPicker } from '../../tools/create-unique-lottery-picker'

const nextEffect = createLotteryPicker(
  {
    effects: { 
      proportion: 1, 
      possibilities: [
        AttributeTypes.PoisonReflect,
        AttributeTypes.ResistPoison,
        AttributeTypes.WeaponPoisonCoat,
      ],
    },
  }, 
)

const nextEquip = createLotteryPicker({
  melee: {
    proportion: 1,
    possibilities: equipmentProfiles.filter(x => x.type === EquipmentType.PrimaryWeapon),
  },
})

const nextRing = createLotteryPicker({
  ring: {
    proportion: 1,
    possibilities: equipmentProfiles
      .filter(x => x.subType === EquipmentSubType.Accessory)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.Sta, 5)),
  },
})

const nextPotion = createLotteryPicker({
  common: {
    proportion: 3,
    possibilities: [
      { count: 3, potion: ItemTypes.PoisonPotion, cost: 1 },
    ],
  },
  rare: {
    proportion: 1,
    possibilities: [
      { count: 1, potion: ItemTypes.PoisonResistPotion, cost: 3 },
    ],
  },
})

export function replaceGavlanItems(placeholders: IItemEntity[], lvl: number) {  
  placeholders.forEach((x, i) => {
    if (i <= 0) replaceRing(x, lvl)
    else if (i <= 2) replaceWeapon(x, lvl)
    else replacePotions(x, lvl)
  })
}

function replaceWeapon(placeholder: IItemEntity, level: number) {
  const equip =  { ...nextEquip() }
  improveEquipAttr(equip, nextEffect(), 1)
  improveEquipAttr(equip, AttributeTypes.WeaponStrongPoison, 1)

  placeholder.itemType = equip.itemType
  placeholder.attributes = equip.attributes
  improveEquipment(placeholder, level - 1)
}

function replaceRing(placeholder: IItemEntity, level: number) {
  const ring = nextRing()
  placeholder.itemType = ring.itemType
  placeholder.attributes = ring.attributes

  improveEquipment(placeholder, level, {
    enhanceCurrentStats: false,
    minCost: level,
    addStackable: false,
    addEffect: true,
  })
}

function replacePotions(placeholder: IItemEntity, level: number) {
  const pot = nextPotion()
  placeholder.itemType = pot.potion
  placeholder.count = pot.count
  priceUp(placeholder, pot.cost)
}