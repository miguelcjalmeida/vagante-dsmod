import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities';
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types';
import { IChestEntity, IEntity } from '../rooms/entities';
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure';
import { shuffleArray } from '../tools/shuffle-array';
import { addItem } from '../manipulators/add-item';
import { RoomNames } from '../rooms/names';

export const scarceland = (ctx: IRoomContext) => {
  console.log('adding surprise boxes')
  ctx.acts.forEach((act) => {
    const smallChests = findEntities<IChestEntity>(act, (x: IEntity) => {
      return x.type === EntityTypes.Chest
      && (<IChestEntity>x).chestType === ChestTypes.Small
    })

    const chestCount = smallChests.length

    for (let i = 0; i < chestCount; i += 1) {
      const chest = smallChests[i]

      chest.nest.splice(chest.nest.indexOf(chest.entity), 1)

      addItem(chest.nest, {
        count: 1,
        itemType: ItemTypes.EnchantScroll,
        cursed: false,
        x: chest.entity.x,
        y: chest.entity.y,
      })
    }
  })
}
