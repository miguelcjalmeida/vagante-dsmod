import { IRoomContext, IRoomAct } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity, IItemEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure'
import { addItem } from '../manipulators/add-item'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { RoomNames } from '../rooms/names'

export const changeTreasureByKeys = (context: IRoomContext) => {
  console.log('replacing old treasures by keys')

  context.acts.forEach((act) => {
    if (act._comment === RoomNames.Intermission) return 

    const treasures = findEntities<IChestEntity>(act, (entity: IChestEntity) => {
      return entity.type === EntityTypes.Chest &&
        entity.chestType === ChestTypes.Locked
    })

    treasures.forEach((treasure) => {
      const treasureKey =  {
        count: 1,
        cursed: false,
        itemType: ItemTypes.TreasureKey,
      }

      const foundBossInNest = treasure.nest.find(x => isBoss(x))

      if (!foundBossInNest) {
        addItem(treasure.nest, {
          ...treasureKey,
          y: treasure.entity.y,
          x: treasure.entity.x + 3,
        })
      }

      treasure.nest.splice(treasure.nest.indexOf(treasure.entity), 1)
    })
  })
}

const isBoss = (entity: IEntity) => {
  const type = entity.type
  
  switch (type) {
    case EntityTypes.Worm:
    case EntityTypes.GoblinKing:
    case EntityTypes.BabyDragon:
    case EntityTypes.MechBoss:
    case EntityTypes.Item:
      return (<IItemEntity>entity).itemType === ItemTypes.TreasureKey
    case EntityTypes.WispBoss:
      return true
  }

  return false
}
