import { IRoomBlock } from '../../rooms/context'
import { IChestEntity, IItemEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
import { EntityTypes } from '../../rooms/types'
import { nextEquipmentPicker } from '../../item-builder/next-equipment-picker'
import { addItemIntoTreasure } from '../../manipulators/add-item-into-treasure'
import { improveEquipment } from '../../item-builder/improve-equipment'
import { createLotteryPicker } from '../../tools/create-lottery-picker'

const nextShouldHaveRareItem = createLotteryPicker({
  shouldHave: {
    proportion: 1,
    possibilities: [true],
  },
  shouldNot: {
    proportion: 1,
    possibilities: [false],
  },
})

export function replaceChests(room: IRoomBlock, equipValue: number) {
  const placeholders = findRoomEntities<IChestEntity>(
    room,
    x => x.type === EntityTypes.Chest,
  )

  placeholders.forEach((x) => {
    const shouldHaveRareItem = nextShouldHaveRareItem()

    if (!shouldHaveRareItem) return 

    const equip = nextEquipmentPicker()

    const item = <IItemEntity>{
      attributes: equip.attributes,
      count: 1,
      cursed: false,
      itemType: equip.itemType,
    }

    improveEquipment(item, equipValue)

    addItemIntoTreasure(x.nest, x.entity, item)
  })
}
