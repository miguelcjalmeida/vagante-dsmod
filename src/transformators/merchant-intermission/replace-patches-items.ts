import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { EntityTypes, ItemTypes } from '../../rooms/types'
import { nextEquipmentPicker } from '../../item-builder/next-equipment-picker'
import { IEquipmentProfile } from '../../item-builder/equipment-profile'
import { improveEquipment } from '../../item-builder/improve-equipment'

const nextItem = createLotteryPicker<IEquipmentProfile | IItemEntity>({
  ...nextEquipmentPicker.lottery,
  custom: {
    proportion: 4,
    possibilities: [
      createItem(ItemTypes.RuneOrb2),
      createItem(ItemTypes.RuneOrb3),
      createItem(ItemTypes.RuneOrb4),
      createItem(ItemTypes.TreasureKey, 3),
    ],
  },
})

export function replacePatchesItems(placeholders: IItemEntity[], equipValue: number) {
  placeholders.forEach((x) => {
    const pick = nextItem()
    const isEquip = pick.type !== EntityTypes.Item
    
    if (isEquip) {
      const equip = pick as IEquipmentProfile
      x.itemType = equip.itemType
      x.attributes = equip.attributes
      x.cursed = true
    
      improveEquipment(x, equipValue)
    }

    if (!isEquip) {
      const item = pick as ICustomItemEntity

      x.itemType = item.itemType
      x.count = item.count
      x.attributes = item.attributes
      x.type = item.type      
      x.cursed = item.custom ? item.cursed : true
    }
  })
}

function createItem(itemType: ItemTypes, count: number = 1) : ICustomItemEntity {
  return {
    itemType,
    count,
    cursed: false,
    type: EntityTypes.Item,
    x: 0,
    y: 0,
    uid: 'any',
    custom: false,
  }
}

export interface ICustomItemEntity extends IItemEntity {
  custom?: boolean
}
