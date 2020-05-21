import { IRoomBlock } from '../rooms/context'
import { dsmod } from './get-template'
import { findRoom } from './find-room'
import { cloneRoom } from './clone-room'

export const cloneDsRoomInto = (room1: IRoomBlock, templateRoomUid: string) => {
  const templateRoom = findRoom(dsmod, templateRoomUid)
  if (!templateRoom) throw new Error(`given template room was not found '${templateRoomUid}'`)
  cloneRoom(room1, templateRoom)
}
