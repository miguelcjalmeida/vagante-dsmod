import { IRoomContext, IRoomBlock } from '../rooms/context'
import { template } from './get-template'
import { findRoom } from './find-room'
import { cloneRoom } from './clone-room'

export const cloneRoomFromTemplate = (room1: IRoomBlock, templateRoomUid: string) => {
  const templateRoom = findRoom(template, templateRoomUid)
  if (!templateRoom) throw new Error(`given template room was not found '${templateRoomUid}'`)
  cloneRoom(room1, templateRoom)
}
