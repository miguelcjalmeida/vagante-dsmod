import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { shuffleArray } from '../tools/shuffle-array'
import { addItem } from '../manipulators/add-item'
import { RoomNames } from '../rooms/names'
import { findAct } from '../finders/find-act'
import merchantTiles from './map/merchant-tiles'
import merchantEntities from './map/merchant-entities'

export const merchantIntermission = (ctx: IRoomContext) => {
  console.log('adding merchants')
  
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    // if (i === '0') continue
    
    const room = intermission.rooms[i]
    const block = room[0]

    if (!block.entities) continue
    const bonfire = block.entities.find(x => x.type === EntityTypes.Bonfire)

    if (!bonfire) continue
    block.tiles = merchantTiles
    block.entities = merchantEntities
  }
}
