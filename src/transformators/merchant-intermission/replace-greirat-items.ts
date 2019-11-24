import { ItemTypes, EntityTypes, BookTypes } from '../../rooms/types'
import { IItemEntity, IBookEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { improveEquipment, IImproveEquipConfig } from '../../item-builder/improve-equipment'
import { priceUp } from '../../item-builder/price-up'

const nextGimmickItem = createLotteryPicker<(lvl : number) => IItemEntity>({
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

const nextBook = createLotteryPicker({
  books: {
    proportion: 1,
    possibilities: [      
      { skill: BookTypes.Dash, cost: 2 },
      { skill: BookTypes.Blink, cost: 1 },
    ],
  },
})

const nextItemReplacer = createLotteryPicker({
  gimmicks: {
    proportion: 2,
    possibilities: [
      (placeholder: IItemEntity, level: number) => {
        const item = nextGimmickItem()(level)
        placeholder.itemType = item.itemType
        placeholder.cursed = false
        placeholder.count = item.count
        placeholder.attributes = item.attributes
        placeholder.type = EntityTypes.Item
      },
    ],
  },
  books: {
    proportion: 1,
    possibilities: [
      (placeholder: IBookEntity, level: number) => {
        const book = nextBook()
        placeholder.itemType = ItemTypes.Book
        placeholder.skill = book.skill
        priceUp(placeholder, book.cost)
      },
    ],
  },
})

export function replaceGreiratItems(placeholders: IItemEntity[], level: number) {
  placeholders.forEach(x => nextItemReplacer()(x, level))
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
