import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { AttributeTypes, ItemTypes } from '../../rooms/types'
import { improveEquipment } from '../../item-builder/improve-equipment'

export function replaceGiantItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach((x : IBookEntity) => {
    x.itemType = ItemTypes.SkullRing
    x.attributes = [
      [AttributeTypes.Archery, 10],
      [AttributeTypes.LightRadius, 1],
      [AttributeTypes.Dex, 2],
    ]
    improveEquipment(x, level)
  })
}
