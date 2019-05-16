import { IEntity, IItemEntity, IChestEntity } from '../rooms/entities'
import { EntityTypes, ItemTypes } from '../rooms/types'
import { uniqueId } from '../tools/unique-id'

export const addItemIntoTreasure =
  (nest: IEntity[], treasure: IChestEntity, item: ITreasureItem) => {
    if (!treasure.uid) {
      const treasureId = uniqueId()
      treasure.uid = treasureId
    }

    const itemId = uniqueId()
    if (!treasure.links) treasure.links = []
    treasure.links.push(itemId)

    const position = nest.indexOf(treasure) + 1

    nest.splice(position, 0, <IItemEntity>{
      x: treasure.x,
      y: treasure.y,
      type: EntityTypes.Item,
      uid: itemId,
      attributes: item.attributes,
      cursed: item.cursed,
      count: item.count,
      itemType: item.itemType,
    })
  }

export interface ITreasureItem {
  attributes?: string[]
  cursed: boolean
  count: number
  itemType: ItemTypes
}
