import { IRoomContext, IRoomBlock, IRoom } from '../rooms/context'
import { RoomNames } from '../rooms/names'
import { findAct } from '../finders/find-act'
import { cloneBuildRoomInto } from '../manipulators/clone-room-from-template'
import { deepClone } from '../tools/deep-clone'
import { replaceBooks } from './merchant-intermission/replace-books'
import { replaceGamblerItems } from './merchant-intermission/replace-gambler-items'
import { replaceShrine } from './merchant-intermission/replace-shrine'
import { replacePotions } from './merchant-intermission/replace-potions'
import { replaceAndreItems } from './merchant-intermission/replace-andre-items'
import { getActValueFromRoomType } from '../item-builder/get-act-value'
import { replaceLenigrastItems } from './merchant-intermission/replace-lenigrast-items'
import { replaceChests } from './merchant-intermission/replace-chests'
import { replaceGimminickItems } from './merchant-intermission/replace-gimminick-items'
import { replaceScrolls } from './merchant-intermission/replace-scrolls'

export const merchantIntermission = (ctx: IRoomContext) => {
  console.log('adding merchants')
  
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    if (isNotMerchantMap(i)) continue

    const room = intermission.rooms[i]
    
    createRandomRooms(room)

    room.forEach(block => applyChangesIntoBlock(block, i))
  }
}

function applyChangesIntoBlock(block: IRoomBlock, roomsType: string) {
  if (!block.entities) return

  cloneBuildRoomInto(block, 'wenuyer')

  const actValue = getActValueFromRoomType(roomsType)

  replaceBooks(block)
  replaceGamblerItems(block, Math.max(0, actValue - 1))
  replaceShrine(block)
  replacePotions(block)
  replaceScrolls(block)
  replaceAndreItems(block, actValue)
  replaceLenigrastItems(block, actValue)
  replaceChests(block, actValue + 2)
  replaceGimminickItems(block, actValue)
}

function isNotMerchantMap(roomsType: string) {
  return (roomsType === '0' || roomsType === '4' || roomsType === '9')
}

function createRandomRooms(rooms: IRoom) {
  const mainRoom = rooms[0]
  const randomRoomsCount = 120

  for (let i = 0; i < randomRoomsCount; i += 1) {
    const newRoom = deepClone(mainRoom)
    rooms.push(newRoom)
  }
}
