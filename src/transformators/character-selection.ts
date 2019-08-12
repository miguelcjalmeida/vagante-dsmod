import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import characterSelectionTiles from './map/character-selection-tiles'
import characterSelectionEntities from './map/character-selection-entities'


export const characterSelection = (context: IRoomContext) => {
  console.log('creating character selection screen')
  
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  intermission.rooms[0][0].tiles = characterSelectionTiles
  intermission.rooms[0][0].entities = characterSelectionEntities
}
