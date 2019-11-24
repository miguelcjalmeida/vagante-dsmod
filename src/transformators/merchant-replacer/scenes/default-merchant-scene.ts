import { IShopEntity, IEntity } from '../../../rooms/entities'
import { createUniqueLotteryPicker } from '../../../tools/create-unique-lottery-picker'
import { 
  andreBuilder, 
  lenigrastBuilder,
   yoelBuilder, 
   siegwardBuilder, 
   patchesBuilder, 
   greiratBuilder, 
   handmaidBuilder, 
   orbeckBuilder,
} from '../merchant-profile'
import { setMerchant } from '../set-merchant'

export function setDefaultMerchantScene(shops: IShopEntity[], actLevel: number, nest: IEntity[]) {
  setMerchant(shops[0], andreBuilder(actLevel), nest)
  setMerchant(shops[1], lenigrastBuilder(actLevel), nest)
  setMerchant(shops[2], greiratBuilder(actLevel), nest)
  setMerchant(shops[3], yoelBuilder(actLevel), nest)
  setMerchant(shops[4], siegwardBuilder(actLevel), nest)
  setMerchant(shops[8], patchesBuilder(actLevel - 1), nest)
  setMerchant(shops[6], handmaidBuilder(actLevel), nest)
  setMerchant(shops[7], orbeckBuilder(actLevel), nest)
}
