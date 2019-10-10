import { IRoomBlock } from '../../rooms/context'
import { IShrineEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { EntityTypes, ShrineTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'

const nextShrine = createLotteryPicker<ShrineTypes>(
  {
    common: { 
      proportion: 2, 
      possibilities: [ShrineTypes.Scholar, ShrineTypes.Well],
    },
    rare: { 
      proportion: 1, 
      possibilities: [ShrineTypes.GodCurse, ShrineTypes.Forge],
    },
  }, 
  shuffleArray,
)

export function replaceShrine(room: IRoomBlock) {
  const shrines = findRoomEntities<IShrineEntity>(
    room,
    x => x.type === EntityTypes.Shrine,
  )

  shrines.forEach((x) => {
    x.entity.godType = nextShrine()
  })
}
