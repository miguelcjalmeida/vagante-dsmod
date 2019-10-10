import { INextOf, nextItemFactory } from '../manipulators/next-item-factory'
import { shuffleArray } from './shuffle-array'

export interface ILotteryStack<T> {
  proportion: number
  possibilities: T[]
}

export interface ILottery<T> {
  [key: string]: ILotteryStack<T>
}


export function createLotteryPicker<T>(
  lotteryConfig: ILottery<T>, 
  resetLotteryAction?: (list: T[]) => void,
) : ILotteryNextOf<T> {
  const lottery : T[] = []

  for (const stackName in lotteryConfig) {
    const stack = lotteryConfig[stackName]

    stack.possibilities.forEach((p) => {
      for (let i = 0; i < stack.proportion; i += 1) {
        lottery.push(p)
      }
    })
  }

  shuffleArray(lottery)
  shuffleArray(lottery)
  shuffleArray(lottery)

  const reset = resetLotteryAction ? resetLotteryAction : shuffleArray

  const factory = nextItemFactory(lottery, reset) as ILotteryNextOf<T>
  factory.lottery = lotteryConfig
  return factory
}

export interface ILotteryNextConfig<T> {
  lottery: ILottery<T>
}

export type ILotteryNextOf<T> = INextOf<T> & ILotteryNextConfig<T>
