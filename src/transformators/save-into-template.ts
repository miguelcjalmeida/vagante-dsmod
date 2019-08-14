import { IRoomContext } from '../rooms/context'
import { template } from '../manipulators/get-template'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { cloneRoom } from '../manipulators/clone-room'
import { EntityTypes } from '../rooms/types'

export const saveIntoTemplate = (ctx: IRoomContext) => {
  // saveIntermissions(ctx)

}


function saveIntermissions(ctx: IRoomContext) {
  const templateIntermission = findAct(template, RoomNames.Intermission)
  if (!templateIntermission) return

  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in templateIntermission.rooms) {
    const room = templateIntermission.rooms[i]
    const block = room[0]

    if (block.entities && 
      block.entities.findIndex(x => x.type === EntityTypes.Bonfire) === -1) {
      continue
    }

    if (i === '0') {
      cloneRoom(room[0], intermission.rooms['0'][0])
    } else {
      cloneRoom(room[0], intermission.rooms['1'][0])
    }
  }
}