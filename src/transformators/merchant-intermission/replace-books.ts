import { IRoomBlock } from '../../rooms/context'
import { IBookEntity, IItemEntity } from '../../rooms/entities'
import { findRoomEntities } from '../../finders/find-room-entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, EntityTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'

const nextBook = createLotteryPicker(
  {
    common: { 
      proportion: 4, 
      possibilities: [
        BookTypes.Dash, BookTypes.MagicMissile, BookTypes.FireShield, 
        BookTypes.Eleclance, BookTypes.FrostNova, BookTypes.FlamePillar,
      ],
    },
    uncommon: { 
      proportion: 3, 
      possibilities: [BookTypes.Blink, BookTypes.Lightning, BookTypes.Spirits],
    },
    rare: { 
      proportion: 2, 
      possibilities: [
        BookTypes.Fireball, BookTypes.ChainLightning, BookTypes.Shockwave, 
      ],
    },
    legendary: { 
      proportion: 1, 
      possibilities: [
        BookTypes.EvilTransformation, BookTypes.SummonMonster, 
        BookTypes.Charm, BookTypes.Iceball,
      ],
    },
  }, 
  shuffleArray,
)


export function replaceBooks(room: IRoomBlock) {
  const books = findRoomEntities<IBookEntity>(
    room,
    x => x.type === EntityTypes.Item && 
    (<IItemEntity>x).itemType === ItemTypes.Book,
  )

  books.forEach((x) => {
    x.entity.skill = nextBook()
  })
}
