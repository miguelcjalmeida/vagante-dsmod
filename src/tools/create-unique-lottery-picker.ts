import { ILottery, createLotteryPicker, ILotteryNextOf } from './create-lottery-picker'
import { INextOf } from '../manipulators/next-item-factory'
import { shuffleArray } from './shuffle-array'

export function createUniqueLotteryPicker<T extends Object>(lottery: ILottery<T>) : INextOf<T> {
  const map = new Map<T, Boolean>()
  let drawSymbol = true

  const nextItem = createLotteryPicker(lottery, (results) => {
    drawSymbol = !drawSymbol
    shuffleArray(results)
  }) 

  return () => {
    while (true) {
      const item = nextItem()

      if (map.get(item) !== drawSymbol) {
        map.set(item, drawSymbol)
        return item
      }
    }
  }
}
