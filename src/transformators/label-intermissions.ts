import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import { findEntities } from '../finders/find-entities';
import { IChestEntity } from '../rooms/entities';
import { addItem } from '../manipulators/add-item';

export const labelIntermission = (context: IRoomContext) => {
  console.log('labeling acts')
  
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  const block = intermission.rooms['4'][0]
  
  if (!block.entities) return
  
  addItem(block.entities, { 
    attributes: [['ATTRIBUTE_SLAYING', 500], ['ATTRIBUTE_VIT', 30]],
    count: 1,
    cursed: false,
    x: 230,
    y: 315,
    itemType: ItemTypes.Dagger,
  })

  addItem(block.entities, { 
    count: 20,
    cursed: false,
    x: 230,
    y: 315,
    itemType: ItemTypes.MagicMappingScroll,
  })

  addItem(block.entities, { 
    count: 1,
    cursed: false,
    x: 235,
    y: 315,
    itemType: 140,
    attributes: [['ATTRIBUTE_LIGHT_RADIUS', 15]],
  })

  addItem(block.entities, { 
    count: 1,
    cursed: false,
    x: 240,
    y: 315,
    itemType: 140,
    attributes: [['ATTRIBUTE_TRUE_SIGHT', 0]],
  })

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

      addItem(nest, { 
        attributes: [['ATTRIBUTE_SLAYING', 500], ['ATTRIBUTE_VIT', 30]],
        count: 1,
        cursed: false,
        x: savePoint.x,
        y: savePoint.y,
        itemType: ItemTypes.Dagger,
      })

      addItem(nest, { 
        count: 20,
        cursed: false,
        x: savePoint.x,
        y: savePoint.y,
        itemType: ItemTypes.MagicMappingScroll,
      })

      addItem(block.entities, { 
        count: 1,
        cursed: false,
        x: savePoint.x,
        y: savePoint.y,
        itemType: 140,
        attributes: [['ATTRIBUTE_LIGHT_RADIUS', 15]],
      })
    
      addItem(block.entities, { 
        count: 1,
        cursed: false,
        x: savePoint.x,
        y: savePoint.y,
        itemType: 140,
        attributes: [['ATTRIBUTE_TRUE_SIGHT', 0]],
      })
    }
  }

  
}
