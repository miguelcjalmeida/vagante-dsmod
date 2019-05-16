import { IFindEntityResult } from '../finders/find-entities'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { IChestEntity } from '../rooms/entities'
import { EntityTypes } from '../rooms/types'

export const infestWith =
  (treasure: IFindEntityResult<IChestEntity>, options: IInfestionOption) => {
    const elevation = options.elevation ? options.elevation : 10

    for (let i = 0; i < options.quantity / 2; i += 1) {
      addSimpleEntity(treasure.nest, {
        type: options.type,
        x: treasure.entity.x + (i * options.distance),
        y: treasure.entity.y + elevation,
        doodadType: options.doodadType,
      })
    }

    for (let i = 0; i < (options.quantity - 1) / 2; i += 1) {
      addSimpleEntity(treasure.nest, {
        type: options.type,
        x: treasure.entity.x - ((i + 1) * options.distance),
        y: treasure.entity.y + elevation,
        doodadType: options.doodadType,
      })
    }
}

export interface IInfestionOption {
  quantity: number
  distance: number
  type: EntityTypes
  elevation?: number
  doodadType?: number
}
