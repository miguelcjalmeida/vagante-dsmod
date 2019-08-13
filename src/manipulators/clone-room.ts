import { IRoomContext, IRoomBlock } from '../rooms/context'

export const cloneRoom = (room1: IRoomBlock, room2: IRoomBlock) => {
  room1.entities = room2.entities
  room1.tiles = room2.tiles
}
