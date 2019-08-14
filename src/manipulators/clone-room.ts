import { IRoomContext, IRoomBlock } from '../rooms/context'

export const cloneRoom = (targetRoom: IRoomBlock, modelRoom: IRoomBlock) => {
  targetRoom.entities = modelRoom.entities
  targetRoom.tiles = modelRoom.tiles
}
