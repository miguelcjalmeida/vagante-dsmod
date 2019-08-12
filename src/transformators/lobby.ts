import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import lobbyItems from './map/lobby-items'
import lobbyTiles from './map/lobby-tiles'

export const lobby = (context: IRoomContext) => {
  console.log('creating lobby')
  
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  intermission.rooms[4][0].tiles = lobbyTiles
  intermission.rooms[4][0].entities = lobbyItems
}