import { IFindEntityResult } from '../finders/find-entities'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { IChestEntity } from '../rooms/entities'
import { EntityTypes } from '../rooms/types'

export const infestWithBats = (treasure: IFindEntityResult<IChestEntity>, quantity: number) => {
  for (let i = 0; i < quantity / 2; i += 1) {
    addSimpleEntity(treasure.nest, {
      type: EntityTypes.Bat,
      x: treasure.entity.x + (i * 2),
      y: treasure.entity.y - 10,
    })

    addSimpleEntity(treasure.nest, {
      type: EntityTypes.Crawler,
      x: treasure.entity.x - (i * 2),
      y: treasure.entity.y - 10,
    })
  }
}
