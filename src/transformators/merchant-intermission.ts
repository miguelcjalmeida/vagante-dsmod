import { IRoomContext, IRoomBlock, IRoom, IRoomAct } from '../rooms/context'
import { RoomNames } from '../rooms/names'
import { findAct } from '../finders/find-act'
import { getActValueFromRoomType } from '../item-builder/get-act-value'
import { replaceChests } from './merchant-intermission/replace-chests'
import { EntityTypes } from '../rooms/types'
import { IShopEntity } from '../rooms/entities'
import { setRandomMerchantScene } from './merchant-replacer/scenes/random-merchant-scene'

export const merchantIntermission = (ctx: IRoomContext) => {
  console.log('adding merchants')
  
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    if (isNotMerchantMap(i)) continue
    const room = intermission.rooms[i]
    room.forEach(block => applyChangesIntoBlock(block, i))
  }
}

function applyChangesIntoBlock(block: IRoomBlock, roomsType: string) {
  if (!block.entities) return

  const actLevel = getActValueFromRoomType(roomsType)
  replaceChests(block, actLevel + 2)

  const nest = block.entities ? block.entities : []
  const shops = nest.filter(x => x.type === EntityTypes.Shop) as IShopEntity[]

  if (roomsType !== '14') {
    setRandomMerchantScene(shops, actLevel, nest)
  }
}

function isNotMerchantMap(roomsType: string) {
  return (roomsType === '0' || roomsType === '4' || roomsType === '9')
}
