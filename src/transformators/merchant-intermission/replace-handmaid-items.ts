import { IItemEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'
import { priceUp } from '../../item-builder/price-up'

const nextPotion = createLotteryPicker<number>(
  {
    permanent: { 
      proportion: 3, 
      possibilities: [
        ItemTypes.StrPotion,
        ItemTypes.IntPotion,
        ItemTypes.DexPotion,
        ItemTypes.LukPotion,
        ItemTypes.SpdPotion,
        ItemTypes.VitPotion,
      ],
    },
  },
  shuffleArray,
)

export function replaceHandmaidItems(placeholders: IItemEntity[]) {
  placeholders.forEach((x) => {
    x.itemType = nextPotion()
    priceUp(x, 2)
  })
}
