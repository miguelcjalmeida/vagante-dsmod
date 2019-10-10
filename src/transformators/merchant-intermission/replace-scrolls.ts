import { IRoomBlock } from '../../rooms/context'
import { IItemEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { EntityTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'

const nextScroll = createLotteryPicker<[ItemTypes, number]>(
  {
    common: { 
      proportion: 3 * (8 - 2), 
      possibilities: [
        [ItemTypes.ChaosScroll, 5],
        [ItemTypes.RechargeScroll, 1],
      ],
    },
    uncommon: { 
      proportion: 2 * (8 - 2), 
      possibilities: [
        [ItemTypes.EnchantScroll, 1],
        [ItemTypes.IdentifyScroll, 2],
      ],
    },
    rare: { 
      proportion: 1 * (8 - 4), 
      possibilities: [
        [ItemTypes.MagicMappingScroll, 1],
        [ItemTypes.UncurseScroll, 1],
        [ItemTypes.TeleportScroll, 3],
        [ItemTypes.JumpScroll, 3],
      ],
    },
  },
  shuffleArray,
)

export function replaceScrolls(room: IRoomBlock) {
  const scrollsMin = ItemTypes.MagicMappingScroll
  const scrollsMax = ItemTypes.JumpScroll 

  const scrolls = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType >= scrollsMin &&
    (<IItemEntity>x).itemType <= scrollsMax,
  )

  scrolls.forEach(x => { 
    const next = nextScroll()
    x.entity.itemType = next[0]
    x.entity.count = next[1]
  })
}
