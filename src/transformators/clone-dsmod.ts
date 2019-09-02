import { IRoomContext, IRoomAct } from '../rooms/context'
import { cloneDsRoomInto } from '../manipulators/clone-room-from-template';
import { findAct } from '../finders/find-act';
import { RoomNames } from '../rooms/names';
import { dsmod } from '../manipulators/get-template';

export const cloneDsMod = (context: IRoomContext) => {
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_ONE)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_TWO)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_THREE)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_FOUR)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_ONE)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_TWO)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_THREE)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_FOUR)
}

function cloneDsModRoomIntoRoom(context: IRoomContext, roomName: RoomNames) {
  const room = findAct(context, roomName)
  if (!room) return

  const dsModRoom = findAct(dsmod, roomName)
  if (!dsModRoom) return
  room.rooms = dsModRoom.rooms
}
