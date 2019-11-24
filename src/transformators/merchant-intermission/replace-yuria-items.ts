import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { AttributeTypes, ItemTypes } from '../../rooms/types'
import { IEquipmentProfile, EquipmentSubType, EquipmentType } 
from '../../item-builder/equipment-profile'
import { improveEquipment } from '../../item-builder/improve-equipment'

const reaper : IEquipmentProfile = {
  itemType: ItemTypes.SpacerRod,
  subType: EquipmentSubType.Rod,
  type: EquipmentType.PrimaryWeapon,
  attributes: [
    [AttributeTypes.Str, 7],
    [AttributeTypes.Luk, 1],
    [AttributeTypes.WeaponLifeSteal, 0],
  ],
}

const nextReaperVit = createLotteryPicker(
  {
    reapers: { 
      proportion: 1, 
      possibilities: [0, -1, -2, -3, -4, -5],
    },
  }, 
)

export function replaceYuriaItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach((x : IBookEntity) => {
    const negativeVitBonus = nextReaperVit() - level
    x.itemType = reaper.itemType
    x.attributes = [...reaper.attributes]

    improveEquipment(x, -negativeVitBonus, {
      minCost: 1,
      addEffect: true,
      addStackable: true,
      enhanceCurrentStats: true,
    })

    const foundVit = x.attributes.find(x => x[0] === AttributeTypes.Vit)
    if (foundVit) foundVit[1] += negativeVitBonus
    else x.attributes.push([AttributeTypes.Vit, negativeVitBonus])
  })
}
