import { IRoomContext, IRoom } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { deepClone } from '../tools/deep-clone'

export const roomInstances = (context: IRoomContext) => {
  multiplyRooms(context, RoomNames.ACT_ONE, 3)
  multiplyRooms(context, RoomNames.ACT_TWO, 5)
  multiplyRooms(context, RoomNames.ACT_THREE, 15)
  multiplyRooms(context, RoomNames.ACT_FOUR, 30)
  multiplyRooms(context, RoomNames.BRANCH_ONE, 15)
  multiplyRooms(context, RoomNames.BRANCH_TWO, 20)
  multiplyRooms(context, RoomNames.BRANCH_THREE, 22)
  multiplyRooms(context, RoomNames.BRANCH_FOUR, 15)
  multiplyRooms(context, RoomNames.Intermission, 120)

  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return
  

  intermission.rooms['0'] = [intermission.rooms['0'][0]]
  intermission.rooms['4'] = [intermission.rooms['4'][0]]
  intermission.rooms['9'] = [intermission.rooms['9'][0]]
}

function multiplyRooms(context: IRoomContext, roomName: RoomNames, randomRoomsCount = 10) {
  const act = findAct(context, roomName)
  if (!act) return 

  for (const i in act.rooms) {
    const room = act.rooms[i]
    
    createRandomRooms(room, randomRoomsCount)
  }
}


function createRandomRooms(roomBlocks: IRoom, randomRoomsCount: number) {
  const blocksCount = roomBlocks.length

  for (let i = 0; i < blocksCount; i += 1) {
    const block = roomBlocks[i]
    block.uid += i

    for (let k = 1; k < randomRoomsCount; k += 1) {
      const newBlock = deepClone(block)
      newBlock.uid += k
      roomBlocks.push(newBlock)
    }
  }
}
