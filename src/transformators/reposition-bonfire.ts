import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure'
import { addItem } from '../manipulators/add-item'
import { addSimpleEntity } from '../manipulators/add-simple-entity'

export const repositionBonfire = (context: IRoomContext) => {
  context.acts.forEach((act) => {
    const graves = findEntities(act, (entity: IEntity) => {
      return entity.type === EntityTypes.Grave
    })

    const bonfires = findEntities(act, (entity: IEntity) => {
      return entity.type === EntityTypes.Bonfire
    })

    const savePoints = findEntities(act, (entity: IEntity) => {
      return entity.type === EntityTypes.LoadSavePoint
    })

    graves.forEach((grave, index) => {
      grave.entity.x = 144 - (index * 10) - (50) 
    })    

    bonfires.forEach((bonfire) => {
      bonfire.entity.x = 144 + 20 - 50
    })

    if (act._comment === 'INTERMISSION') {
      savePoints.forEach((savePoint) => {
        savePoint.entity.x = 144 + 20 - 50 - 30
      })
    }
  })
}
