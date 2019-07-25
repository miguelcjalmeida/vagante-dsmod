import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure'
import { addItem } from '../manipulators/add-item'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { findAct } from '../finders/find-act';
import { RoomNames } from '../rooms/names';

export const repositionBonfire = (context: IRoomContext) => {
  console.log('repositioning intermission objects')

  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  const graves = findEntities(intermission, (entity: IEntity) => {
    return entity.type === EntityTypes.Grave
  })

  const bonfires = findEntities(intermission, (entity: IEntity) => {
    return entity.type === EntityTypes.Bonfire
  })

  const savePoints = findEntities(intermission, (entity: IEntity) => {
    return entity.type === EntityTypes.LoadSavePoint
  })

  graves.forEach((grave, index) => {
    grave.entity.x = (144 - 50) - ((index % 4) * 10) 
  })    

  bonfires.forEach((bonfire) => {
    bonfire.entity.x = 144 + 20 - 50
  })

  savePoints.forEach((savePoint) => {
    savePoint.entity.x = 144 + 20 - 50 - 30
  })
}
