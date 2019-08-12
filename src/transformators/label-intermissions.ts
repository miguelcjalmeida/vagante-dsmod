import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import { findEntities } from '../finders/find-entities';
import { IChestEntity } from '../rooms/entities';

export const labelIntermission = (context: IRoomContext) => {
  console.log('labeling acts')
  
  for (const actIndex in context.acts) {
    const act = context.acts[actIndex]
    
    for (const i in act.rooms) {
      const room = act.rooms[i]
      const nest = room[0].entities
      if (!nest) continue

      const savePoint = nest.find(x => x.type === EntityTypes.LoadSavePoint)
      if (!savePoint) {
        console.log(`no save point found on act '${act._comment}' room '${i}'`)
        continue
      }

      console.log(`label '${i}' added!`)

      addLabel(nest, {
        x: savePoint.x,
        y: savePoint.y,
        text: `room index '${i}'`,
      })
    }
  }
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  
}
