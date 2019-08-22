import { IRoomAct, IRoomBlock } from '../rooms/context'
import { IEntity } from '../rooms/entities'
import { IFindEntityResult, findEntitiesMatcher } from './find-entities'

export const findRoomEntities = <T extends IEntity>(
  block: IRoomBlock, matcher: findEntitiesMatcher) => {

  const results = [] as IFindEntityResult<T>[]

  if (!block.entities) return []

  block.entities.forEach((entity) => {
    if (matcher(entity)) {
      results.push({
        block,
        entity: entity as T,
        nest: block.entities as IEntity[],
        tiles: block.tiles,
      })
    }
  })
  
  return results
}
