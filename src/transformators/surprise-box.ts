import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities';
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types';
import { IChestEntity, IEntity } from '../rooms/entities';
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure';
import { shuffleArray } from '../tools/shuffle-array';

export const surpriseBox = (ctx: IRoomContext) => {
  console.log('adding surprise boxes')
  ctx.acts.forEach((act) => {
    const smallChests = findEntities<IChestEntity>(act, (x: IEntity) => {
      return x.type === EntityTypes.Chest 
        && (<IChestEntity>x).chestType === ChestTypes.Small
    })

    shuffleArray(smallChests)
    shuffleArray(smallChests)
    shuffleArray(smallChests)

    const chestCount = smallChests.length
    const surpriseBoxCount = chestCount * 0.20

    for (let i = 0; i < chestCount && i < surpriseBoxCount; i += 1) {
      const chest = smallChests[i]
      const box = getSurpriseBox(i)

      addItemIntoTreasure(chest.nest, chest.entity, {
        count: box.count,
        itemType: box.itemType,
        cursed: false,
      })
    }
  })

}


function getSurpriseBox(index: number) {
  if (index % 4 === 0) return { count: 2, itemType: ItemTypes.RechargeScroll }
  return { count: 4, itemType: ItemTypes.EnchantScroll }
}
