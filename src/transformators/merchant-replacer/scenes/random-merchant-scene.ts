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
   irinaBuilder,
   cornyxBuilder,
   yuriaBuilder,
   sirrisBuilder,
   giantBuilder,
   anriBuilder,
   gavlanBuilder,
   karlaBuilder,
} from '../merchant-profile'
import { setMerchant } from '../set-merchant'

export function setRandomMerchantScene(shops: IShopEntity[], actLevel: number, nest: IEntity[]) {
  const nextShopBuilder = createUniqueLotteryPicker({
    all: {
      proportion: 1,
      possibilities: [
        andreBuilder,
        lenigrastBuilder,
        yoelBuilder,
        siegwardBuilder,
        patchesBuilder,
        greiratBuilder,
        handmaidBuilder,
        orbeckBuilder,
        irinaBuilder,
        cornyxBuilder,
        yuriaBuilder,
        sirrisBuilder,
        giantBuilder,
        anriBuilder,
        gavlanBuilder,
        karlaBuilder,
      ],
    },
  })

  shops.forEach((shop) => {
    setMerchant(shop, nextShopBuilder()(actLevel), nest)
  })
}
