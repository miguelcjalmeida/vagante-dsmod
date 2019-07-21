import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure';
import { addItem } from '../manipulators/add-item';
import { addSimpleEntity } from '../manipulators/add-simple-entity';

export const removeRewardingTreasure = (context: IRoomContext) => {
  context.acts.forEach((act) => {
    console.log('finding entities in act', act._comment)

    const graves = findEntities(act, (entity: IEntity) => {
      return entity.type === EntityTypes.Grave
    })

    graves.forEach((grave) => {
      grave.nest.splice(grave.nest.indexOf(grave.entity), 1)
    })

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

      const foundBossInNest = treasure.nest.find(x => isBoss(x.type))

      if (!foundBossInNest) {
        addItem(treasure.nest, {
          ...treasureKey,
          y: treasure.entity.y,
          x: treasure.entity.x + 3,
        })
      }

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Bonfire,
        x: treasure.entity.x - 3,
        y: treasure.entity.y - 10,
      })

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Grave,
        x: treasure.entity.x - 10,
        y: treasure.entity.y,
      })

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Grave,
        x: treasure.entity.x - 10,
        y: treasure.entity.y,
      })

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Grave,
        x: treasure.entity.x - 5,
        y: treasure.entity.y,
      })

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Grave,
        x: treasure.entity.x - 10,
        y: treasure.entity.y,
      })

      addSimpleEntity(treasure.nest, {
        type: EntityTypes.Grave,
        x: treasure.entity.x + 15,
        y: treasure.entity.y,
      })

      treasure.nest.splice(treasure.nest.indexOf(treasure.entity), 1)
    })
  })
}


const isBoss = (entity: EntityTypes | string) => {
  switch (entity) {
    case EntityTypes.Worm:
    case EntityTypes.GoblinKing:
    case EntityTypes.BabyDragon:
      return true
  }

  return false
}
