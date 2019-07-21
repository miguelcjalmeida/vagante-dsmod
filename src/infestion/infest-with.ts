import { IFindEntityResult } from '../finders/find-entities'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { IChestEntity } from '../rooms/entities'
import { EntityTypes } from '../rooms/types'

export const infestWith =
(treasure: IFindEntityResult<IChestEntity>, options: IInfestionOption) => {
  const elevation = options.elevation ? options.elevation : 10
  const distanceOffset = options.distanceOffset === undefined ? 0 : options.distanceOffset

  const quantitiesByDirection = getQuantityToPopulateDirections(
    options.quantity, 
    options.direction === undefined ? DirectionEnum.centerToBothSides : options.direction,
  )

  for (let i = 0; i < quantitiesByDirection.centerToRightQuantity; i += 1) {
    addSimpleEntity(treasure.nest, {
      type: options.type,
      x: treasure.entity.x + (i * options.distance) + distanceOffset,
      y: treasure.entity.y - elevation,
      doodadType: options.doodadType,
    })
  }

  for (let i = 0; i < quantitiesByDirection.centerToLeftQuantity; i += 1) {
    addSimpleEntity(treasure.nest, {
      type: options.type,
      x: treasure.entity.x - ((i + 1) * options.distance) + distanceOffset,
      y: treasure.entity.y - elevation,
      doodadType: options.doodadType,
    })
  }
}

function getQuantityToPopulateDirections(totalQuantity: number, direction: DirectionEnum) {
  if (direction === DirectionEnum.centerToBothSides) {    
    return { 
      centerToLeftQuantity: (totalQuantity - 1) / 2,
      centerToRightQuantity: (totalQuantity) / 2,
    }
  }

  if (direction === DirectionEnum.leftOnly) {
    return { 
      centerToLeftQuantity: totalQuantity,
      centerToRightQuantity: 0,
    }
  }

  return { 
    centerToLeftQuantity: 0,
    centerToRightQuantity: totalQuantity,
  }
}

export interface IInfestionOption {
  quantity: number
  distance: number
  direction?: DirectionEnum
  type: EntityTypes
  elevation?: number
  doodadType?: number
  distanceOffset?: number
}


export enum DirectionEnum {
  leftOnly = -1,
  rightOnly = 1,
  centerToBothSides = 0,
}
