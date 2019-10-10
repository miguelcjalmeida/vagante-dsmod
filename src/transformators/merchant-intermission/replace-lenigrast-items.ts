import { equipmentProfiles, EquipmentType, EquipmentSubType }
  from '../../item-builder/equipment-profile'
import { ItemTypes, EntityTypes } from '../../rooms/types'
import { findRoomEntities } from '../../finders/find-room-entities'
import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { shuffleArray } from '../../tools/shuffle-array'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { IRoomBlock } from '../../rooms/context'
import { deepClone } from '../../tools/deep-clone'

const weapons = equipmentProfiles.filter(
  x => x.type === EquipmentType.PrimaryWeapon,
)

const bows = equipmentProfiles.filter(
  x => x.subType === EquipmentSubType.Bow,
)

const itemToReplace = ItemTypes.CopperSword
const nextEquip = createLotteryPicker(
  {
    weapons: {
      proportion: 3,
      possibilities: weapons,
    },
    bows: {
      proportion: 9,
      possibilities: bows,
    },
  }, 
  shuffleArray,
)

export function replaceLenigrastItems(room: IRoomBlock, actValue: number) {
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
