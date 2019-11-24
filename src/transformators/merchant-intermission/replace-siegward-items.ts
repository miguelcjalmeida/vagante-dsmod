import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, AttributeTypes, ItemTypes } from '../../rooms/types'
import { priceUp } from '../../item-builder/price-up'

const nextFood = createLotteryPicker(
  {
    foods: { 
      proportion: 1, 
      possibilities: [
        { food: ItemTypes.PorkChop, cost: 0, count: 1 },
        { food: ItemTypes.Chicken, cost: -12, count: 1 },
        { food: ItemTypes.Sashimi, cost: -12, count: 3 },
        { food: ItemTypes.Candy, cost: -12, count: 1 },
        { food: ItemTypes.CookedEye, cost: -12, count: 2 },
      ],
    },
  }, 
)

export function replaceSiegwardItems(placeholders: IItemEntity[]) {
  placeholders.forEach((x) => {
    const item = nextFood()
    x.itemType = item.food
    x.cursed = true
    x.count = item.count
    priceUp(x, item.cost)
  })
}
