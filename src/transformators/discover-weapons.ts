import { IRoomContext } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { IItemEntity, IEntity } from '../rooms/entities'
import { ItemTypes, EntityTypes } from '../rooms/types'
import { findEntities } from '../finders/find-entities'

export const discoverWeapons = (context: IRoomContext) => {
  console.log('adding weapons to lobby')

  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    const nest = intermission.rooms[i][0].entities
    if (!nest) continue
  

    for (let i = 0; i < 40; i += 1) {
      const page = 1

      nest.push(<IItemEntity>{
        count: 1,
        cursed: false,
        itemType: i + (page * 40),
        type: EntityTypes.Item,
        x: 80 + i * 10,
        y: 280,
      })
    }
  }
}

