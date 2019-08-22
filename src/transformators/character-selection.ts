import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import characterSelectionTiles from './map/character-selection-tiles'
import characterSelectionEntities from './map/character-selection-entities'
import { template } from '../manipulators/get-template'
import { findRoom } from '../manipulators/find-room'
import { cloneRoomFromTemplate } from '../manipulators/clone-room-from-template'
import { findEntities } from '../finders/find-entities';
import { findRoomEntities } from '../finders/find-room-entities';
import { IEntity, IChestEntity } from '../rooms/entities';
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure';


export const characterSelection = (context: IRoomContext) => {
  console.log('creating character selection screen')
  
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  const charSelectRoom = intermission.rooms[0][0]

  cloneRoomFromTemplate(charSelectRoom, 'rufyury')

  const entities = charSelectRoom.entities
  if (!entities) return 

  const spareChest = getSpecialChest(charSelectRoom, 'Item_100')
  const cursedSpareChest = getSpecialChest(charSelectRoom, 'Item_99')

  if (!spareChest || !cursedSpareChest) return 

  for (let i = 0; i < 16 ; i += 1) {
    addItemIntoTreasure(spareChest.nest, spareChest.entity, {
      attributes: [],
      count: 1,
      cursed: false,
      itemType: ItemTypes.Sword,
    })
  } 
}

function getSpecialChest(charSelectRoom: IRoomBlock, itemInsideUid: string) {
  return findRoomEntities<IChestEntity>(charSelectRoom, (x: IEntity) => {
    if (x.type !== EntityTypes.Chest) return false

    const chest = <IChestEntity>x
    return !!chest.links && chest.links.length === 1 && chest.links[0] === itemInsideUid
  })[0]
}
