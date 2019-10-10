import { IRoomAct } from '../rooms/context'
import { RoomNames } from '../rooms/names'

export function getActValue(act: IRoomAct) {
  return getActValueByName(act._comment)
}

export function getActValueFromRoomType(roomType: string) {
  if (roomType === '0') return getActValueByName(RoomNames.ACT_ONE)
  if (roomType === '2') return getActValueByName(RoomNames.ACT_ONE)
  if (roomType === '3') return getActValueByName(RoomNames.BRANCH_ONE)
  if (roomType === '1') return getActValueByName(RoomNames.ACT_ONE)
  if (roomType === '5') return getActValueByName(RoomNames.ACT_TWO)
  if (roomType === '6') return getActValueByName(RoomNames.ACT_TWO)
  if (roomType === '7') return getActValueByName(RoomNames.BRANCH_TWO)
  if (roomType === '12') return getActValueByName(RoomNames.ACT_THREE)
  if (roomType === '8') return getActValueByName(RoomNames.ACT_THREE)
  if (roomType === '13') return getActValueByName(RoomNames.BRANCH_THREE)
  if (roomType === '10') return getActValueByName(RoomNames.ACT_FOUR)
  if (roomType === '14') return getActValueByName(RoomNames.BRANCH_FOUR)
  return getActValueByName(RoomNames.ACT_ONE)
}

export function getActValueByName(name: string) {
  if (name === RoomNames.ACT_ONE) return 1
  if (name === RoomNames.ACT_TWO) return 1
  if (name === RoomNames.ACT_THREE) return 2
  if (name === RoomNames.ACT_FOUR) return 2
  if (name === RoomNames.BRANCH_ONE) return 2
  if (name === RoomNames.BRANCH_TWO) return 2
  if (name === RoomNames.BRANCH_THREE) return 3
  if (name === RoomNames.BRANCH_FOUR) return 3
  return 0
}
