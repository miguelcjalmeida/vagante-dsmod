import { IRoomContext } from '../rooms/context'

export const findRoom = (ctx: IRoomContext, uid: string) => {
  for (const i in ctx.acts) {
    const act = ctx.acts[i]
    const rooms = act.rooms

    for (const j in rooms) {
      const room = rooms[j]
      
      for (const k in room) {
        const block = room[k]

        if (block.uid === uid) return block
      }
    }
  }

  return null
}
