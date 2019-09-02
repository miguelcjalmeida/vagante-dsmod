import { IRoomContext, IRoomBlock } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity, IEntity, IItemEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { shuffleArray } from '../tools/shuffle-array'
import { addItem } from '../manipulators/add-item'
import { RoomNames } from '../rooms/names'
import { findAct } from '../finders/find-act'
import merchantTiles from './map/merchant-tiles'
import merchantEntities from './map/merchant-entities'
import { cloneBuildRoomInto } from '../manipulators/clone-room-from-template'
import { findRoomEntities } from '../finders/find-room-entities'
import { randomNumber } from '../tools/random-number'

export const merchantIntermission = (ctx: IRoomContext) => {
  console.log('adding merchants')
  
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    // if (i === '0') continue
    
    const room = intermission.rooms[i]
    const block = room[0]

    if (!block.entities) continue
    const bonfire = block.entities.find(x => x.type === EntityTypes.Bonfire)

    if (!bonfire) {
      cloneBuildRoomInto(block, 'eduxelo')
      continue
    }

    cloneBuildRoomInto(block, 'wenuyer')
    replacePotions(block)
    replaceScrolls(block)
    replaceDaggers(block, parseInt(i, 10))
  }
}

function replacePotions(room: IRoomBlock) {
  const potionsMin = 10
  const potionsMax = 31 

  const potions = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType >= potionsMin &&
    (<IItemEntity>x).itemType <= potionsMax,
  )

  potions.forEach(x => x.entity.itemType = randomNumber(potionsMin, potionsMax))
}

function replaceScrolls(room: IRoomBlock) {
  const scrollsMin = 34
  const scrollsMax = 41 

  const scrolls = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType >= scrollsMin &&
    (<IItemEntity>x).itemType <= scrollsMax,
  )

  scrolls.forEach(x => x.entity.itemType = randomNumber(scrollsMin, scrollsMax))
}

function replaceDaggers(room: IRoomBlock, roomIndex: number) {
  const throwDaggers = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType === ItemTypes.ThrowDagger,
  )

  throwDaggers.forEach((dagger) => {
    const slayBonus = Math.floor(roomIndex / 4.5)

    if (!dagger.entity.attributes) return
    
    let slayAttr = dagger.entity.attributes.find(x => x[0] === 'ATTRIBUTE_SLAYING')

    if (slayBonus === 0) return

    if (!slayAttr) {
      slayAttr = ['ATTRIBUTE_SLAYING', slayBonus]
      dagger.entity.attributes.push(slayAttr)
      return 
    }

    slayAttr[1] = slayAttr[1] + slayBonus
  })
}
