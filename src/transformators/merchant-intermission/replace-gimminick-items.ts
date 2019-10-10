import { ItemTypes, EntityTypes } from '../../rooms/types'
import { findRoomEntities } from '../../finders/find-room-entities'
import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { improveEquipment, IImproveEquipConfig } from '../../item-builder/improve-equipment'
import { IRoomBlock } from '../../rooms/context'

const itemToReplace = ItemTypes.ThrowingDagger

const nextItem = createLotteryPicker<(lvl : number) => IItemEntity>({
  explosives: {
    proportion: 18,
    possibilities: [
      () => createItem(ItemTypes.Bomb, 3),
      () => createItem(ItemTypes.ExplosiveArrow, 16),
    ],
  },
  throwDagger: {
    proportion: 18,
    possibilities: [
      lvl => createImprovedItem(ItemTypes.ThrowingDagger, lvl, {
        addEffect: true,
        addStackable: false,
        enhanceCurrentStats: false,
        minCost: 1,
      }),
    ],
  },
  wands: {
    proportion: 2,
    possibilities: [
      () => createItem(ItemTypes.LightningWand),
      () => createItem(ItemTypes.FireWand),
      () => createItem(ItemTypes.IceWand),
      () => createItem(ItemTypes.WandOfBlink),
      () => createItem(ItemTypes.WandOfChaos),
      () => createItem(ItemTypes.WandOfDigging),
      () => createItem(ItemTypes.WandOfPestilence),
      lvl => createImprovedItem(ItemTypes.BrokenWand, lvl + 1),
    ],
  },
  healingWand: {
    proportion: 1,
    possibilities: [
      () => createItem(ItemTypes.WandOfHealing),
    ],
  },
  boomerang: {
    proportion: 8,
    possibilities: [
      lvl => createImprovedItem(ItemTypes.Boomerang, lvl),
    ],
  },
  hook: {
    proportion: 4,
    possibilities: [
      () => createItem(ItemTypes.GrapplingHook),
    ],
  },
})

export function replaceGimminickItems(room: IRoomBlock, equipValue: number) {
  const placeholders = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType === itemToReplace,
  )

  placeholders.forEach((x) => {
    const item = nextItem()(equipValue)
    
    x.entity.itemType = item.itemType
    x.entity.cursed = false
    x.entity.count = item.count
    x.entity.attributes = item.attributes
    x.entity.type = EntityTypes.Item
  })
}


function createItem(type: ItemTypes, quantity = 1) {
  return <IItemEntity>{
    count: quantity,
    cursed: false,
    itemType: type,
    type: EntityTypes.Item,
  }
}

function createImprovedItem(type: ItemTypes, equipValue: ItemTypes, config?: IImproveEquipConfig) {
  const item = createItem(type)
  item.attributes = []
  improveEquipment(item, equipValue, config)
  return item
}
