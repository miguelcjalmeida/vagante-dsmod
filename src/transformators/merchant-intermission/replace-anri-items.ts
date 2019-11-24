import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { AttributeTypes, ItemTypes } from '../../rooms/types'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { IEquipmentProfile, EquipmentSubType, EquipmentType }
from '../../item-builder/equipment-profile'

const sword : IEquipmentProfile = {
  itemType: ItemTypes.SteelSword,
  attributes: [
    [AttributeTypes.CoinHeal, 0],
    [AttributeTypes.Luk, 1],
  ],
  subType: EquipmentSubType.Sword,
  type: EquipmentType.PrimaryWeapon,
}


const ring : IEquipmentProfile = {
  itemType: ItemTypes.EyeRing,
  attributes: [
    [AttributeTypes.CoinHeal, 0],
  ],
  subType: EquipmentSubType.Accessory,
  type: EquipmentType.Ring,
}

const nextItem = createLotteryPicker({
  equips: {
    proportion: 1,
    possibilities: [sword, ring],
  },
})

export function replaceAnriItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach((x : IBookEntity) => {
    const item = nextItem()
    x.itemType = item.itemType
    x.attributes = item.attributes
    improveEquipment(x, level)

    const foundLuk = x.attributes.find(x => x[0] === AttributeTypes.Luk)
    if (foundLuk) foundLuk[1] = foundLuk[1] * 2
  })
}
