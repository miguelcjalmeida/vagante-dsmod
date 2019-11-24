import { IItemEntity, IBookEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, AttributeTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'
import { priceUp } from '../../item-builder/price-up'

const nextBook = createLotteryPicker(
  {
    book: { 
      proportion: 1, 
      possibilities: [
        { skill: BookTypes.Lightning, cost: 2 },
        { skill: BookTypes.ChainLightning, cost: 3 },
        { skill: BookTypes.Eleclance, cost: 1 },
      ],
    },
  }, 
)

export function replaceIrinaItems(placeholders: IItemEntity[]) {
  const wand = placeholders[0]
  wand.itemType = ItemTypes.WandOfHealing
  priceUp(wand, 5)

  const healthPotion = placeholders[1]
  healthPotion.count = 3
  healthPotion.itemType = ItemTypes.HealingPotion
  priceUp(healthPotion, 4)

  placeholders.forEach((x : IBookEntity, i) => {
    if (i < 2) return
    const book = nextBook()
    x.itemType = ItemTypes.Book
    x.skill = book.skill
    priceUp(x, book.cost)
  })
}
