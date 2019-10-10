import { IRoomContext, IRoomAct } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { EntityTypes, ItemTypes, ChestTypes } from '../rooms/types'
import { findEntities } from '../finders/find-entities'
import { IChestEntity, IItemEntity } from '../rooms/entities'
import { addItem } from '../manipulators/add-item'
import { shuffleArray } from '../tools/shuffle-array'
import { improveEquipment } from '../item-builder/improve-equipment'
import { getActValue } from '../item-builder/get-act-value'
import { nextEquipmentPicker } from '../item-builder/next-equipment-picker'
import { createLotteryPicker } from '../tools/create-lottery-picker'
import { equipmentProfiles } from '../item-builder/equipment-profile'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'

const nextShouldPlaceEquipment = createLotteryPicker(
  {
    shouldPlace: {
      proportion: 1,
      possibilities: [true],
    },
    shouldNotPlace: {
      proportion: 2,
      possibilities: [false],
    },
  }, 
  shuffleArray,
)

export const itemsCreator = (ctx: IRoomContext) => {
  createActItems(ctx, RoomNames.ACT_ONE)
  createActItems(ctx, RoomNames.ACT_TWO)
  createActItems(ctx, RoomNames.ACT_THREE)
  createActItems(ctx, RoomNames.ACT_FOUR)
  createActItems(ctx, RoomNames.BRANCH_ONE)
  createActItems(ctx, RoomNames.BRANCH_TWO)
  createActItems(ctx, RoomNames.BRANCH_THREE)
  createActItems(ctx, RoomNames.BRANCH_FOUR)
}

function createActItems(ctx: IRoomContext, actName: RoomNames) {
  const act = findAct(ctx, actName)
  if (!act) return

  const actValue = getActValue(act)

  replaceChests(act)
  replacePlaceholders(act)
  improveAllItems(act, actValue)
}

function replaceChests(act: IRoomAct) {
  const chests = findEntities<IChestEntity>(
    act, 
    x => x.type === EntityTypes.Chest && (<IChestEntity>x).chestType === ChestTypes.Small,
  )

  shuffleArray(chests)

  let current = 0

  chests.forEach((chest) => {
    const shouldPlace = nextShouldPlaceEquipment()
    const newEquip = nextEquipmentPicker()
    const item = <IItemEntity>{
      attributes: newEquip.attributes,
      count: 1,
      cursed: act._comment === RoomNames.BRANCH_FOUR,
      itemType: newEquip.itemType,
      x: chest.entity.x,
      y: chest.entity.y,
    }

    if (!shouldPlace) return

    addItem(chest.nest, item)
    chest.nest.splice(chest.nest.indexOf(chest.entity), 1)
    current += 1
  })

  console.log(`items placed ${current}/${chests.length}`)
}

function replacePlaceholders(act: IRoomAct) {
  const placeHolders = findEntities<IItemEntity>(
    act, 
    x => x.type === EntityTypes.Item 
      && (<IItemEntity>x).itemType === ItemTypes.MagicMappingScroll 
      && (<IItemEntity>x).count === 33,
  )

  placeHolders.forEach((p) => {
    const equip = nextEquipmentPicker()
    p.entity.count = 1
    p.entity.type = EntityTypes.Item
    p.entity.cursed = false
    p.entity.attributes = equip.attributes
    p.entity.itemType = equip.itemType

    console.log('replaced with', equip.itemType)
  })
}

function improveAllItems(act: IRoomAct, actValue: number) {
  const items = findEntities<IItemEntity>(
    act, 
    x => x.type === EntityTypes.Item 
      && equipmentProfiles[(<IItemEntity>x).itemType] !== undefined,
  )

  items.forEach((item) => {
    improveEquipment(item.entity, actValue)
  })
}
