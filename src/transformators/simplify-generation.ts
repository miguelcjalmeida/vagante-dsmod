import { IRoomContext } from '../rooms/context'
import { RoomNames } from '../rooms/names';

export const simplifyGeneration = (ctx: IRoomContext) => {
  ctx.acts.forEach((act) => {
    if (act._comment === RoomNames.Intermission) return
    if (act._comment === RoomNames.FinalFight) return
    
    for (const i in act.rooms) {
      act.rooms[i] = [act.rooms[i][0]]
    }
  })
}