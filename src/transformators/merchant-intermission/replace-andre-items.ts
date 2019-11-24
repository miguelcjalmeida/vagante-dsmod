import { equipmentProfiles, EquipmentType } from '../../item-builder/equipment-profile'
import { EntityTypes } from '../../rooms/types'
import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { shuffleArray } from '../../tools/shuffle-array'
import { improveEquipment } from '../../item-builder/improve-equipment'

const armor = equipmentProfiles.filter(x => x.type === EquipmentType.Armor)
const boots = equipmentProfiles.filter(x => x.type === EquipmentType.Boots)
const gloves = equipmentProfiles.filter(x => x.type === EquipmentType.Glove)
const caps = equipmentProfiles.filter(x => x.type === EquipmentType.Cap)

const nextArmor = createLotteryPicker({ armor: { proportion: 3, possibilities: armor } })
const nextBoot = createLotteryPicker({ boots: { proportion: 3, possibilities: boots } })
const nextGlove = createLotteryPicker({ gloves: { proportion: 3, possibilities: gloves } })
const nextCap = createLotteryPicker({ caps: { proportion: 3, possibilities: caps } })

export const nextAndreEquipPicker = createLotteryPicker(
  {
    all: {
      proportion: 1,
      possibilities: [
        nextArmor,
        nextBoot,
        nextGlove,
        nextCap,
      ],
    },
  }, 
  shuffleArray,
)

export function replaceAndreItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach((x) => {
    const equip = nextAndreEquipPicker()()
    
    x.itemType = equip.itemType
    x.cursed = false
    x.count = 1
    x.attributes = equip.attributes
    x.type = EntityTypes.Item

    improveEquipment(x, level)
  })
}
