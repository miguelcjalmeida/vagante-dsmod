import { IEntity, IItemEntity, IChestEntity } from '../rooms/entities'
import { EntityTypes, ItemTypes } from '../rooms/types'
import { uniqueId } from '../tools/unique-id'
import { ITreasureItem } from './add-item-into-treasure'

export const addItem =
  (nest: IEntity[], item: IItemOptions) => {
    const itemId = uniqueId()

    const newItem = <IItemEntity>{
      type: EntityTypes.Item,
      uid: itemId,
      x: item.x,
      y: item.y,
      attributes: item.attributes,
      cursed: item.cursed,
      count: item.count,
      itemType: item.itemType,
    }

    nest.push(newItem)

    return newItem
  }

export interface IItemOptions extends ITreasureItem {
  x: number
  y: number
}
