import { IRoomContext, IRoomBlock } from '../rooms/context'
import { buildroom, dsmod } from './get-template'
import { findRoom } from './find-room'
import { cloneRoom } from './clone-room'

export const cloneBuildRoomInto = (room1: IRoomBlock, templateRoomUid: string) => {
  const templateRoom = findRoom(buildroom, templateRoomUid)
  if (!templateRoom) throw new Error(`given template room was not found '${templateRoomUid}'`)
  cloneRoom(room1, templateRoom)
}

export const cloneDsRoomInto = (room1: IRoomBlock, templateRoomUid: string) => {
  const templateRoom = findRoom(dsmod, templateRoomUid)
  if (!templateRoom) throw new Error(`given template room was not found '${templateRoomUid}'`)
  cloneRoom(room1, templateRoom)
}
