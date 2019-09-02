import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import characterSelectionTiles from './map/character-selection-tiles'
import characterSelectionEntities from './map/character-selection-entities'
import { dsmod } from '../manipulators/get-template'
import { findRoom } from '../manipulators/find-room'
import { cloneBuildRoomInto } from '../manipulators/clone-room-from-template'
import { findEntities } from '../finders/find-entities'
import { findRoomEntities } from '../finders/find-room-entities'
import { IEntity, IChestEntity, IItemEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'


export const characterSelection = (context: IRoomContext) => {
  console.log('creating character selection screen')
  
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  const charSelectRoom = intermission.rooms[0][0]

  cloneBuildRoomInto(charSelectRoom, 'rufyury')

  const entities = charSelectRoom.entities
  if (!entities) return 

  setQuantity(entities, 'Item_53', 4599)
  setQuantity(entities, 'Item_41', 4599)
  setQuantity(entities, 'Item_42', 4599)
  setQuantity(entities, 'Item_40', 4599)
  setQuantity(entities, 'Item_39', 12)
  setQuantity(entities, 'Item_21', 99)

  console.log('items replaced')
}

function setQuantity(entities: IEntity[], uid: string, quantity: number) {
  const items = <IItemEntity>entities.find(x => (<IItemEntity>x).uid === uid)
  
  if (items) {
    items.count = quantity
  } 
}

function getSpecialChest(charSelectRoom: IRoomBlock, itemInsideUid: string) {
  return findRoomEntities<IChestEntity>(charSelectRoom, (x: IEntity) => {
    if (x.type !== EntityTypes.Chest) return false

    const chest = <IChestEntity>x
    return !!chest.links && chest.links.length === 1 && chest.links[0] === itemInsideUid
  })[0]
}
