import { IEntity, IChestEntity } from '../rooms/entities'
import { uniqueId } from '../tools/unique-id'
import { EntityTypes, ChestTypes } from '../rooms/types'
import { ITreasureItem, addItemIntoTreasure } from './add-item-into-treasure'

export const addTreasure = (nest: IEntity[], treasure: ITreasureOptions) => {
  const entity : IChestEntity = {
    uid: uniqueId(),
    type: EntityTypes.Chest,
    x: treasure.x,
    y: treasure.y,
    chestType: treasure.chestType,
  }

  nest.push(entity)

  treasure.items.forEach((item) => {
    addItemIntoTreasure(nest, entity, item)
  })
}

export interface ITreasureOptions {
  x: number
  y: number
  chestType: ChestTypes
  items: ITreasureItem[]
}
