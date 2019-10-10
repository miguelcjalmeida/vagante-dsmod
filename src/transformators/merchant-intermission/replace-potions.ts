import { IRoomBlock } from '../../rooms/context'
import { IItemEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { EntityTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'

const nextPotion = createLotteryPicker<number>(
  {
    permanent: { 
      proportion: 3, 
      possibilities: [
        ItemTypes.PoisonPotion,
        ItemTypes.StrPotion,
        ItemTypes.IntPotion,
        ItemTypes.DexPotion,
        ItemTypes.LukPotion,
        ItemTypes.SpdPotion,
        ItemTypes.VigorPotion,
      ],
    },
    temporary: { 
      proportion: 2, 
      possibilities: [
        ItemTypes.DefensePotion,
        ItemTypes.VigorPotion,
        ItemTypes.MagicPotion,
        ItemTypes.FeatherfallPotion,
        ItemTypes.HealingPotion,
        ItemTypes.QuicknessPotion,
      ],
    },
    resists: {
      proportion: 1, 
      possibilities: [
        ItemTypes.FireResistPotion, ItemTypes.ColdResistPotion, 
        ItemTypes.ElectranceResistPotion, ItemTypes.PoisonResistPotion,
      ],
    },
    crap: {
      proportion: 2,
      possibilities: [
        ItemTypes.DexDebuffPotion,
        ItemTypes.ColdResistDebuffPotion,
        ItemTypes.ElectranceResistDebuffPotion,
        ItemTypes.FireResistDebuffPotion,
        ItemTypes.IntDebuffPotion,
        ItemTypes.LukDebuffPotion,
        ItemTypes.PoisonResistDebuffPotion,
        ItemTypes.StrDebuffPotion,
        ItemTypes.VitDebuffPotion,
      ],
    },
  },
  shuffleArray,
)

export function replacePotions(room: IRoomBlock) {
  const potionsMin = 6
  const potionsMax = 31 

  const potions = findRoomEntities<IItemEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType >= potionsMin &&
    (<IItemEntity>x).itemType <= potionsMax,
  )

  potions.forEach((x) => {
    x.entity.itemType = nextPotion()
  })
}
