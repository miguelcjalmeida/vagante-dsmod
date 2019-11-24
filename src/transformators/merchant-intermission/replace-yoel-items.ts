import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, AttributeTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'
import { priceUp } from '../../item-builder/price-up'

const nextBook = createLotteryPicker(
  {
    common: { 
      proportion: 1, 
      possibilities: [
        { skill: BookTypes.MagicMissile, cost: 1 },
        { skill: BookTypes.Spirits, cost: 1 },
        { skill: BookTypes.FrostNova, cost: 2 },
        { skill: BookTypes.Charm, cost: 4 },
        { skill: BookTypes.Shockwave, cost: 3 },
      ],
    },
  }, 
)

export function replaceYoelItems(itemPlaceholders: IItemEntity[]) {
  const placeholders = itemPlaceholders.map((x : IBookEntity) => {
    x.itemType = ItemTypes.Book
    x.skill = BookTypes.Blink
    return x
  })
  
  placeholders.forEach((x) => {
    const book = nextBook()
    x.skill = book.skill
    priceUp(x, book.cost)
  })
}
