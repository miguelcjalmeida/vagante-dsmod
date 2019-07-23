import { IRoomContext, IRoomAct } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure'
import { addItem } from '../manipulators/add-item'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { RoomNames } from '../rooms/names'

export const removeRewardingTreasure = (context: IRoomContext) => {
  console.log('replacing old treasures by bonfire')
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

      treasure.nest.splice(treasure.nest.indexOf(treasure.entity), 1)
    })

    if (act._comment === RoomNames.BRANCH_FOUR) {
      addBonfireAboveMechBoss(act)
    }
  })
}


function addBonfireAboveMechBoss(act: IRoomAct) {
  for (const i in act.rooms) {
    const roomBlock = act.rooms[i]
    roomBlock.forEach((room) => {
      if (!room.entities) return

      const mechBoss = room.entities.find(entity => entity.type === EntityTypes.MechBoss)
      if (!mechBoss) return

      addSimpleEntity(room.entities, {
        type: EntityTypes.Bonfire,
        x: mechBoss.x + 40,
        y: mechBoss.y - 158,
      })
    })
  }
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
