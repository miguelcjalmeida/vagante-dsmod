import { IRoomContext } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { dsmod } from '../manipulators/get-template'

export const cloneDsMod = (context: IRoomContext) => {
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_ONE)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_TWO)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_THREE)
  cloneDsModRoomIntoRoom(context, RoomNames.ACT_FOUR)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_ONE)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_TWO)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_THREE)
  cloneDsModRoomIntoRoom(context, RoomNames.BRANCH_FOUR)
  cloneDsModRoomIntoRoom(context, RoomNames.FinalFight)
  cloneDsModRoomIntoRoom(context, RoomNames.Intermission)
}

function cloneDsModRoomIntoRoom(context: IRoomContext, roomName: RoomNames) {
  cloneSpecs(context, roomName)

  const room = findAct(context, roomName)
  if (!room) return

  const dsModRoom = findAct(dsmod, roomName)
  if (!dsModRoom) return
  room.rooms = dsModRoom.rooms
}

function cloneSpecs(context: IRoomContext, roomName: RoomNames) {
  const specs = context.act_specifications.find(x => x._comment === roomName)
  const dsmodSpecs = dsmod.act_specifications.find(x => x._comment === roomName)
  if (!specs || !dsmodSpecs) return
  specs.width = dsmodSpecs.width
  specs.height = dsmodSpecs.height
}
