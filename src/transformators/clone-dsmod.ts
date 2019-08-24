import { IRoomContext, IRoomAct } from '../rooms/context'
import { cloneDsRoomInto } from '../manipulators/clone-room-from-template';
import { findAct } from '../finders/find-act';
import { RoomNames } from '../rooms/names';
import { dsmod } from '../manipulators/get-template';

export const cloneDsMod = (context: IRoomContext) => {
  const branch4 = findAct(context, RoomNames.BRANCH_FOUR)
  if (!branch4) return

  const dsModBranch4 = findAct(dsmod, RoomNames.BRANCH_FOUR)
  if (!dsModBranch4) return

  branch4.rooms = dsModBranch4.rooms

  console.log('cloned act4 rooms')
}
