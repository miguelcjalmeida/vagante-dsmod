import { IRoomBlock } from '../../rooms/context'
import { IShopEntity, IItemEntity, IEntity } from '../../rooms/entities'
import { Merchant } from './merchant-profile'
import { addLabel } from '../../manipulators/add-label'
import { uniqueId } from '../../tools/unique-id'


export interface IShopConfig {
  items: IItemEntity[]
}

export function setMerchant(entity: IShopEntity, merchant: Merchant, nest: IEntity[]) {
  entity.uid = entity.uid ? entity.uid : uniqueId()
  entity.size = merchant.items.length
  entity.type = 'Shop'
  entity.links = merchant.items.map(x => x.uid)
  
  merchant.items.forEach(x => nest.push(x))

  addLabel(nest, {
    text: merchant.name,
    x: entity.x,
    y: entity.y,
    labelOffsetX: (entity.facingLeft ? 32 : -32),
    triggerOffsetX: 16 * -20,
    triggerOffsetY: 16 * -20,
    triggerWidth: 16 * 60,
    triggerHeight: 16 * 60,
  })
}

