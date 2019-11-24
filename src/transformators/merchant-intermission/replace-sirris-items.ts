import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { AttributeTypes, ItemTypes } from '../../rooms/types'
import { improveEquipAttr } from '../../item-builder/improve-equipment-attr'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { nextAndreEquipPicker } from './replace-andre-items'

const nextArmor = () => {
  const armor = { ...nextAndreEquipPicker()() }
  armor.attributes = [...armor.attributes]
  improveEquipAttr(armor, AttributeTypes.CoinHeal, 0)
  return armor
}

export function replaceSirrisItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach((x : IBookEntity) => {
    const armor = nextArmor()
    x.itemType = armor.itemType
    x.attributes = armor.attributes

    improveEquipment(x, level - 1)
  })
}
