import { createLotteryPicker } from '../tools/create-lottery-picker'
import { basicAttributes } from './attributes-by-type'

export const nextBasicAttribute = createLotteryPicker({
  common: {
    proportion: 1,
    possibilities: basicAttributes, 
  },
})
