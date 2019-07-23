import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { addTreasure } from '../manipulators/add-treasure'
import { ChestTypes, ItemTypes, EntityTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import { IEntity, IItemEntity } from '../rooms/entities'
import { ITreasureItem } from '../manipulators/add-item-into-treasure'

const INTERMISSION_GROUND_LEVEL = 192
const BONFIRE_CENTER_X = 239

let nextTreasureLocationX = 0

export const addIntermissionTreasures = (context: IRoomContext) => {
  console.log('adding treasures into intermissions')

  context.acts.forEach((act) => {
    if (act._comment !== RoomNames.Intermission) return

    for (const i in act.rooms) {
      const roomBlock = act.rooms[i]
      
      roomBlock.forEach((room) => {
        const nest = room.entities
        if (!nest) return
        const bonfires = nest.filter(entity => entity.type === EntityTypes.Bonfire)

        if (bonfires.length === 1) { 
          nextTreasureLocationX = bonfires[0].x + 35
          populateRoom(room)
        }
      })
    }
  })
}

function populateRoom(room: IRoomBlock) {
  const nest = room.entities
  
  if (!nest) {
    return
  }

  const groundLevel = getGroundLevel(nest)
  const originalFirstChestX = nextTreasureLocationX

  for (let i = 0; i < 2; i += 1) {
    nextTreasureLocationX = originalFirstChestX + (i * 10)
    
    const addNextTreasure = (label: string, items: ITreasureItem[]) => {
      addTreasure(nest, {
        items,
        x: nextTreasureLocation(),
        y: groundLevel,
        label: i !== 0 ? undefined : label,
        chestType: ChestTypes.Locked,
      })
    }

    addNextTreasure('Trash chest', [
      {
        count: 1,
        cursed: true,
        itemType: ItemTypes.Sword,
      },
      {
        count: 1,
        cursed: true,
        itemType: ItemTypes.MagicRod,
      },
      {
        count: 1,
        cursed: true,
        itemType: ItemTypes.Dagger,
      },
      {
        count: 1,
        cursed: true,
        itemType: ItemTypes.Club,
      },
      {
        count: 1,
        cursed: true,
        itemType: ItemTypes.ShortBow,
      },
    ])
    
    addNextTreasure('Adventurers chest', [
      {
        count: 1,
        cursed: false,
        itemType: ItemTypes.JumpScroll,
      },
      {
        count: 1,
        cursed: false,
        itemType: ItemTypes.MagicMappingScroll,
      },
      {
        count: 1,
        cursed: false,
        itemType: ItemTypes.TeleportScroll,
      },
    ])

    addNextTreasure('Chaos chest', [
      {
        count: 5,
        cursed: false,
        itemType: ItemTypes.ChaosScroll,
      },
    ])

    addNextTreasure('Enchanter chest', [
      {
        count: 1,
        cursed: false,
        itemType: ItemTypes.EnchantScroll,
      },
    ])
  
    addNextTreasure('Wand Master chest', [
      {
        count: 2,
        cursed: false,
        itemType: ItemTypes.RechargeScroll,
      },
    ])
  
    addNextTreasure('Arrows chest', [
      {
        count: 15,
        cursed: false,
        itemType: ItemTypes.Arrow,
      },
      { 
        count: 1,
        cursed: false,
        itemType: ItemTypes.ExplosiveArrow,
      },
    ])
  
    addNextTreasure('Alchemy chest', [
      grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
      grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
      grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
      grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
      grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
    ])
  }
}


function nextTreasureLocation() {
  const value = nextTreasureLocationX 
  nextTreasureLocationX += 32
  return value
}

function grabRandomItem(minItemId: number, maxItemId: number) {
  const itemId = getRandomInt(minItemId, maxItemId)

  return <ITreasureItem> {
    count: 1,
    cursed: false,
    itemType: itemId,
  } 
}


function getGroundLevel(nest: IEntity[]) {
  let groundLevel = 200

  nest.forEach((entity) => {
    if (entity.type === EntityTypes.Grave) groundLevel = entity.y
  })

  return groundLevel
}

function getRandomInt(min: number, max: number) {
  const nMin = Math.ceil(min)
  const nMax = Math.floor(max)
  return Math.floor(Math.random() * (nMax - nMin + 1)) + nMin
}
