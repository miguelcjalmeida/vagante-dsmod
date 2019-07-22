import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findAct } from '../finders/find-act';
import { RoomNames } from '../rooms/names';
import { addTreasure } from '../manipulators/add-treasure';
import { ChestTypes, ItemTypes, EntityTypes } from '../rooms/types';
import { addLabel } from '../manipulators/add-label';
import { IEntity, IItemEntity } from '../rooms/entities';
import { ITreasureItem } from '../manipulators/add-item-into-treasure';

const INTERMISSION_GROUND_LEVEL = 192
const BONFIRE_CENTER_X = 239

let nextTreasureLocationX = 144 + 20 + 15 + 20

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

  
  nextTreasureLocationX = 144 + 20 + 15 + 20

  const groundLevel = getGroundLevel(nest)

  addTreasure(nest, {
    x: nextTreasureLocation(),
    y: groundLevel,
    label: 'Random',
    chestType: ChestTypes.Small,
    items: [
      {
        itemType: ItemTypes.TreasureKey,
        count: 12,
        cursed: false,
      },
    ],
  })
  
  const trashItems = [
    ItemTypes.Dagger,
    ItemTypes.Sword,
    ItemTypes.Club,
    ItemTypes.MagicRod,
  ]

  addTreasure(nest, {
    x: nextTreasureLocation(),
    y: groundLevel,
    label: 'Trash chest',
    chestType: ChestTypes.Locked,
    items: [
      grabRandomCursedEquipment(trashItems),
      grabRandomCursedEquipment(trashItems),
      grabRandomCursedEquipment(trashItems),
    ],
  })

  addTreasure(nest, {
    x: nextTreasureLocation(),
    y: groundLevel,
    label: 'Adventurers chest',
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
    label: 'Chaos chest',
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
    label: 'Enchanter chest',
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
    label: 'Wand Master chest',
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
    label: 'Arrows chest',
    chestType: ChestTypes.Locked,
    items: [
      {
        count: 30,
        cursed: false,
        itemType: ItemTypes.Arrow,
      },
      {
        count: 1,
        cursed: false,
        itemType: ItemTypes.ExplosiveArrow,
      },
    ],
  })

  addTreasure(nest, {
    x: nextTreasureLocation(),
    y: groundLevel,
    label: 'Alchemy chest',
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
    label: 'Healing chest',
    chestType: ChestTypes.Locked,
    items: [
      {
        count: 1,
        itemType: ItemTypes.HealingPotion,
        cursed: false,
      },
      {
        count: 2,
        itemType: ItemTypes.PoisonPotion,
        cursed: false,
      },
    ],
  })
}


function nextTreasureLocation() {
  const value = nextTreasureLocationX 
  nextTreasureLocationX += 25
  return value
}

function grabRandomCursedEquipment(types: ItemTypes[]) {
  const equipIndex = getRandomInt(0, types.length)

  return <ITreasureItem> {
    count: 1,
    cursed: true,
    itemType: types[equipIndex],
  } 
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
