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
  context.acts.forEach((act) => {
    if (act._comment === 'TUTORIAL') return

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
    
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Trash chest',
      chestType: ChestTypes.Locked,
      items: [
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
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Adventurers chest',
      chestType: ChestTypes.Locked,
      items: [
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
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Chaos chest',
      chestType: ChestTypes.Locked,
      items: [
        {
          count: 3,
          cursed: false,
          itemType: ItemTypes.ChaosScroll,
        },
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Enchanter chest',
      chestType: ChestTypes.Locked,
      items: [
        {
          count: 1,
          cursed: false,
          itemType: ItemTypes.EnchantScroll,
        },
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Wand Master chest',
      chestType: ChestTypes.Locked,
      items: [
        {
          count: 2,
          cursed: false,
          itemType: ItemTypes.RechargeScroll,
        },
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Arrows chest',
      chestType: ChestTypes.Locked,
      items: [
        {
          count: 30,
          cursed: false,
          itemType: ItemTypes.Arrow,
        },
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Alchemy chest',
      chestType: ChestTypes.Locked,
      items: [
        grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
        grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
        grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
        grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
        grabRandomItem(ItemTypes.ColdResistancePotion, ItemTypes.NegativePoisonResistancePotion),
      ],
    })
  
    addTreasure(nest, {
      x: nextTreasureLocation(),
      y: groundLevel,
      label: i !== 0 ? undefined : 'Healing chest',
      chestType: ChestTypes.Locked,
      items: [
        {
          count: getRandomInt(0, 2),
          itemType: ItemTypes.HealingPotion,
          cursed: false,
        },
      ],
    })
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
