import { IRoomAct } from '../rooms/context'
import { IEntity } from '../rooms/entities'

export type findEntitiesMatcher = (entity: IEntity) => boolean


export interface IFindEntityResult<T> {
  nest: IEntity[]
  entity: T
}

export const findEntities = <T extends IEntity>(act: IRoomAct, matcher: findEntitiesMatcher) => {
  const results = [] as IFindEntityResult<T>[]

  for (const roomName in act.rooms) {
    const room = act.rooms[roomName]

    room.forEach((block) => {
      if (!block.entities) return

      block.entities.forEach((entity) => {
        if (matcher(entity)) {
          results.push({
            entity: entity as T,
            nest: block.entities as IEntity[],
          })
        }
      })
    })
  }

  return results
}
