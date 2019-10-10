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

    for (let k = 0; k < randomRoomsCount; k += 1) {
      const newBlock = deepClone(block)
      newBlock.uid += k
      roomBlocks.push(newBlock)
    }
  }
}
