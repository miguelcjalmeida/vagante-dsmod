import { equipmentProfiles, EquipmentType, EquipmentSubType }
  from '../../item-builder/equipment-profile'
import { ItemTypes, EntityTypes } from '../../rooms/types'
import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { shuffleArray } from '../../tools/shuffle-array'
import { improveEquipment } from '../../item-builder/improve-equipment'

const weapons = equipmentProfiles.filter(
  x => x.type === EquipmentType.PrimaryWeapon,
)

const bows = equipmentProfiles.filter(
  x => x.subType === EquipmentSubType.Bow,
)

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

export function replaceLenigrastItems(placeholders: IItemEntity[], actValue: number) {
  placeholders.forEach((x) => {
    const equip = nextEquip()
    
    x.itemType = equip.itemType
    x.cursed = false
    x.count = 1
    x.attributes = equip.attributes
    x.type = EntityTypes.Item

    improveEquipment(x, actValue)
  })
}
