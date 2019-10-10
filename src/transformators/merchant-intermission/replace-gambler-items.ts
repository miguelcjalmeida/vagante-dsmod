import { IRoomBlock } from '../../rooms/context'
import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
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

export function replaceGamblerItems(room: IRoomBlock, equipValue: number) {
  const placeholders = findRoomEntities<IBookEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType === ItemTypes.RuneOrb1,
  )

  placeholders.forEach((x) => {
    const pick = nextItem()
    const isEquip = pick.type !== EntityTypes.Item
    
    if (isEquip) {
      const equip = pick as IEquipmentProfile
      x.entity.itemType = equip.itemType
      x.entity.attributes = equip.attributes
      x.entity.cursed = true
    
      improveEquipment(x.entity, equipValue)
    }

    if (!isEquip) {
      const item = pick as ICustomItemEntity

      x.entity.itemType = item.itemType
      x.entity.count = item.count
      x.entity.attributes = item.attributes
      x.entity.type = item.type      
      x.entity.cursed = item.custom ? item.cursed : true
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
