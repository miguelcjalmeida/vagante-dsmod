import { IRoomContext, IRoomBlock, IRoomAct } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import { findEntities } from '../finders/find-entities'
import { IChestEntity, IItemEntity } from '../rooms/entities'
import { addItem } from '../manipulators/add-item'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { nextItemFactory } from '../manipulators/next-item-factory'
import campaignRings from './map/campaign-rings'
import { shuffleArray } from '../tools/shuffle-array'

const firstRing = 119
const lastRing = 154
const firstSpecialRing = 205
const lastSpecialRing = 211

const items = getPossibleItems()
shuffleArray(items)
shuffleArray(items)
shuffleArray(items)
shuffleArray(items)
shuffleArray(items)
shuffleArray(items)

const nextActItem = nextItemFactory(items)

export const itemsCreator = (context: IRoomContext) => {
  let actItemsTotal = 0 
  let branchItemsTotal = 0
  console.log('creating items around the world')
  console.log(`custom items pool size is ${getPossibleItems().length}`)
  
  context.acts.forEach((act) => {
    if (act._comment === RoomNames.Intermission) return
    if (act._comment === RoomNames.Tutorial) return
    if (act._comment === RoomNames.Arena) return
    if (act._comment === RoomNames.FinalFight) return

    const isBranch = act._comment.indexOf('BRANCH') !== -1
    const totalChests = getTotalChests(act)
    const maxItems = Math.floor(totalChests * getActDropRate(act))

    let totalItemsAdded = 0 

    console.log(`\n-------- ${act._comment} ---------`)

    for (const i in act.rooms) {
      const blocks = act.rooms[i]
      blocks.forEach(x => totalItemsAdded = insertItemIntoBlock(act, x, maxItems, totalItemsAdded))
    }

    if (isBranch) branchItemsTotal += maxItems
    if (!isBranch) actItemsTotal += maxItems

    console.log(`*total: ${maxItems}`)
  })

  console.log(`\n* acts total: ${actItemsTotal}`)
  console.log(`* branches total: ${branchItemsTotal}`)
  console.log(`* all stages total: ${branchItemsTotal + actItemsTotal}`)
  console.log(`* item variety: ${items.length}`)
}

function getTotalChests(act: IRoomAct) {
  let total = 0

  for (const i in act.rooms) {
    const blocks = act.rooms[i]
    blocks.forEach((b) => {
      const nest = b.entities
      if (!nest) return

      const smallChests = nest
        .filter(e => e.type === EntityTypes.Chest 
          && (<IChestEntity>e).chestType === ChestTypes.Small)

      total += smallChests.length
    })
  }

  return total
}

function insertItemIntoBlock(act: IRoomAct, block: IRoomBlock, max: number, current: number) {
  const nest = block.entities
  
  let itemsAdded = 0

  if (!nest) return current

  const chests = <IChestEntity[]>nest.filter(e => e.type === EntityTypes.Chest)
  
  chests.forEach((chest) => {
    if (current + itemsAdded + 1 > max) return 

    const item = nextActItem()

    addItem(nest, {
      x: chest.x,
      y: chest.y,
      attributes: item.attributes,
      count: 1,
      cursed: false,
      itemType: item.itemType,
    })

    const type = <number>item.itemType >= firstRing 
        && <number> item.itemType <= lastRing ? 'ring' : 'amulet'
    
    const skill = item.attributes && item.attributes[0] ? 
        item.attributes[0][0].replace('ATTRIBUTE_', '') : 
        'NONE'

    // console.log(`- ${type} (${skill})`)

    itemsAdded += 1
  })

  return current + itemsAdded
}

function getActDropRate(act: IRoomAct) {
  if (act._comment === RoomNames.ACT_ONE) return 0.3
  if (act._comment === RoomNames.ACT_TWO) return 0.45
  if (act._comment === RoomNames.ACT_THREE) return 0.35
  if (act._comment === RoomNames.ACT_FOUR) return 0.35
  if (act._comment === RoomNames.BRANCH_ONE) return 0.75
  if (act._comment === RoomNames.BRANCH_TWO) return 0.75
  if (act._comment === RoomNames.BRANCH_THREE) return 0.75
  if (act._comment === RoomNames.BRANCH_FOUR) return 0.75
  return 0.5
}

function isBranchItem(act: IRoomAct) {
  return act._comment.indexOf('BRANCH') !== -1
} 

function getPossibleItems() {

  const entities = campaignRings

  const rings = entities.filter(
    x => x.type === EntityTypes.Item &&
    x.itemType !== undefined && 
    ((x.itemType >= firstRing && x.itemType <= lastRing) ||
    (x.itemType >= firstSpecialRing && x.itemType <= lastSpecialRing)),
  )

  const firstAmulet = 107
  const lastAmulet = 122
  const amuletTypesCount = lastAmulet - firstAmulet

  const amulets = rings.map((ring) => {
    const amuletType = firstAmulet + (<number>ring.itemType % amuletTypesCount)

    return {
      ...ring,
      itemType: amuletType,
    }
  })

  return [...rings, ...amulets]
}
