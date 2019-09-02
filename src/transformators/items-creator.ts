import { IRoomContext, IRoomBlock, IRoomAct } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { addLabel } from '../manipulators/add-label'
import { findEntities, IFindEntityResult } from '../finders/find-entities'
import { IChestEntity, IItemEntity, IEntity } from '../rooms/entities'
import { addItem } from '../manipulators/add-item'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { nextItemFactory, INextOf } from '../manipulators/next-item-factory'
import { shuffleArray } from '../tools/shuffle-array'
import { findRoom } from '../manipulators/find-room'
import { findRoomEntities } from '../finders/find-room-entities'
import { buildroom } from '../manipulators/get-template'

let commonItems : IItemEntity[] = []
let uncommonItems : IItemEntity[] = []
let rareItems : IItemEntity[] = []
let legendaryItems : IItemEntity[] = []

let nextCommonItem = nextItemFactory(commonItems)
let nextUncommonItem = nextItemFactory(commonItems)
let nextRareItem = nextItemFactory(commonItems)
let nextLegendaryItem = nextItemFactory(commonItems)

export const itemsCreator = (ctx: IRoomContext) => {
  classifyItemsByRarity(ctx)

  // tslint:disable-next-line:max-line-length
  setActItems(ctx, RoomNames.ACT_ONE, { common: commonItems.length * 3, uncommon: 0, rare: 0, legendary: 0 })
  setActItems(ctx, RoomNames.ACT_TWO, { common: 'all', uncommon: 'all', rare: 0, legendary: 0 })
  setActItems(ctx, RoomNames.ACT_THREE, { common: 0, uncommon: 'all', rare: 'all', legendary: 0 })
  setActItems(ctx, RoomNames.ACT_FOUR, { common: 0, uncommon: 0, rare: 'all', legendary: 0 })
  setActItems(ctx, RoomNames.BRANCH_ONE, { common: 0, uncommon: 'all', rare: 0, legendary: 0 })
  setActItems(ctx, RoomNames.BRANCH_TWO, { common: 0, uncommon: 0, rare: 'all', legendary: 0 })
  setActItems(ctx, RoomNames.BRANCH_THREE, { common: 0, uncommon: 0, rare: 'all', legendary: 0 })
  setActItems(ctx, RoomNames.BRANCH_FOUR, { common: 0, uncommon: 0, rare: 0, legendary: 'all' })
}

function setActItems(ctx: IRoomContext, actName: RoomNames, items: IActItems) {
  const act = findAct(ctx, actName)
  if (!act) return

  const chests = findEntities(
    act, 
    x => x.type === EntityTypes.Chest && (<IChestEntity>x).chestType === ChestTypes.Small,
  )

  shuffleArray(chests)

  const nextChest = nextItemFactory(chests)

  addItemByCategory(items.common, commonItems, nextChest, nextCommonItem)
  addItemByCategory(items.uncommon, uncommonItems, nextChest, nextUncommonItem)
  addItemByCategory(items.rare, rareItems, nextChest, nextRareItem)
  addItemByCategory(items.legendary, legendaryItems, nextChest, nextLegendaryItem)
}

function addItemByCategory(
  count: IActItemCount, 
  items: IItemEntity[], 
  nextChest: INextOf<IFindEntityResult<IEntity>>,
  nextItem: INextOf<IItemEntity>,
) {
  const itemsToBePlaced = count === 'all' ? items.length : count

  for (let i = 0; i < itemsToBePlaced; i += 1) {
    const chest = nextChest()
    const item = nextItem()

    addItem(
      chest.nest, 
      Object.assign({}, item, { x: chest.entity.x, y: chest.entity.y }),
    )
  }
}

function classifyItemsByRarity(context: IRoomContext) {
  const commonItemEndY = 377
  const uncommonItemEndY = 265
  const rareItemEndY = 187 
  const legendaryItemEndY = 123

  const itemRoom = findRoom(buildroom, 'hebezix')
  if (!itemRoom) return

  const entities = itemRoom.entities
  if (!entities) return
  
  const items = findRoomEntities<IItemEntity>(itemRoom, x => x.type === EntityTypes.Item)

  commonItems = getItemsBetweenRange(items, uncommonItemEndY, commonItemEndY)
  uncommonItems = getItemsBetweenRange(items, rareItemEndY, uncommonItemEndY)
  rareItems = getItemsBetweenRange(items, legendaryItemEndY, rareItemEndY)
  legendaryItems = getItemsBetweenRange(items, 0, legendaryItemEndY)

  shuffleArray(commonItems)
  shuffleArray(uncommonItems)
  shuffleArray(rareItems)
  shuffleArray(legendaryItems)

  nextCommonItem = nextItemFactory(commonItems)
  nextUncommonItem = nextItemFactory(uncommonItems)
  nextRareItem = nextItemFactory(rareItems)
  nextLegendaryItem = nextItemFactory(legendaryItems)
}

function getItemsBetweenRange(
  items: IFindEntityResult<IItemEntity>[], beginY: number, endY: number) {
  return items
    .filter(x => x.entity.y > beginY && x.entity.y < endY)
    .map(x => x.entity)
}

interface IActItems {
  common: IActItemCount
  uncommon: IActItemCount
  rare: IActItemCount
  legendary: IActItemCount
}

type IActItemCount = number | 'all' 

