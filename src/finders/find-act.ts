import { IRoomContext } from '../rooms/context'
import { RoomNames } from '../rooms/names'

export const findAct = (context: IRoomContext, name: RoomNames) => {
  for (const act of context.acts) {
    if (act._comment === name) return act
  }

  return null
}
