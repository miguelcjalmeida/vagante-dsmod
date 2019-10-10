import { createLotteryPicker } from '../tools/create-lottery-picker'
import { equipmentProfiles, EquipmentSubType, EquipmentType } from './equipment-profile'
import { ItemTypes } from '../rooms/types'
import { shuffleArray } from '../tools/shuffle-array'

export const nextEquipmentPicker = createLotteryPicker(
  {
    weapons: {
      proportion: 1,
      possibilities: equipmentProfiles.filter(x => x.type === EquipmentType.PrimaryWeapon),
    },
    bows: {
      proportion: 9,
      possibilities: equipmentProfiles.filter(x => x.subType === EquipmentSubType.Bow),
    },
    armor: {
      proportion: 1,
      possibilities: equipmentProfiles.filter(
        x => x.type !== EquipmentType.PrimaryWeapon &&
          x.type !== EquipmentType.SecondaryWeapon),
    },
    rings: {
      proportion: 1,
      possibilities: equipmentProfiles.filter(
        x => x.type === EquipmentType.Ring || x.type === EquipmentType.Amulet,
      ),
    },
    boomerang: {
      proportion: 3,
      possibilities: [equipmentProfiles[ItemTypes.Boomerang]],
    },
  },
  shuffleArray,
)
