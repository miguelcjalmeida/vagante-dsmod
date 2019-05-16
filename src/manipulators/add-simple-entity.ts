import { IEntity } from '../rooms/entities'
import { EntityTypes } from '../rooms/types'

export const addSimpleEntity =
  (nest: IEntity[], options: ISimpleEntityOptions) => {
    nest.push(<IEntity>{
      x: options.x,
      y: options.y,
      type: options.type,
    })
  }

export interface ISimpleEntityOptions {
  x: number
  y: number
  type: EntityTypes
  doodadType?: number,
}
