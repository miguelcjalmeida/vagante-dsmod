import { equipmentProfiles, EquipmentType } from '../../item-builder/equipment-profile'
import { ItemTypes, EntityTypes } from '../../rooms/types'
import { findRoomEntities } from '../../finders/find-room-entities'
import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { shuffleArray } from '../../tools/shuffle-array'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { IRoomBlock } from '../../rooms/context'
import { deepClone } from '../../tools/deep-clone'

const equips = equipmentProfiles.filter(
  x => x.type === EquipmentType.Armor ||
  x.type === EquipmentType.Boots ||
  x.type === EquipmentType.Glove ||
  x.type === EquipmentType.Cap,
)

const itemToReplace = ItemTypes.ReinforcedArmor
const nextEquip = createLotteryPicker(
  {
    all: {
      proportion: 3,
      possibilities: equips,
    },
  }, 
  shuffleArray,
)

export function replaceAndreItems(room: IRoomBlock, actValue: number) {
  const placeholders = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType === itemToReplace,
  )

  placeholders.forEach((x) => {
    const equip = nextEquip()
    
    x.entity.itemType = equip.itemType
    x.entity.cursed = false
    x.entity.count = 1
    x.entity.attributes = equip.attributes
    x.entity.type = EntityTypes.Item

    improveEquipment(x.entity, actValue)
  })
}
