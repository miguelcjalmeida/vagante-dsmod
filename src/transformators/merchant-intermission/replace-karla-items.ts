import { IItemEntity, IBookEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, AttributeTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'
import { priceUp } from '../../item-builder/price-up'
import { equipmentProfiles, EquipmentSubType } from '../../item-builder/equipment-profile'
import { improveEquipAttr } from '../../item-builder/improve-equipment-attr'
import { improveEquipment } from '../../item-builder/improve-equipment'

const nextBook = createLotteryPicker(
  {
    book: { 
      proportion: 1, 
      possibilities: [
        { skill: BookTypes.SummonMonster, cost: 4 },
        { skill: BookTypes.Iceball, cost: 4 },
        { skill: BookTypes.EvilTransformation, cost: 5 },
      ],
    },
  }, 
)

const nextEquip = createLotteryPicker({
  rod: {
    proportion: 2,
    possibilities: equipmentProfiles.filter(x => x.subType === EquipmentSubType.Rod),
  },
  dagger: {
    proportion: 1,
    possibilities: equipmentProfiles
      .filter(x => x.subType === EquipmentSubType.Dagger)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.Int, 1)),
  },
})


export function replaceKarlaItems(placeholders: IItemEntity[], lvl: number) {
  const equip = nextEquip()
  const item1 = placeholders[0]
  item1.itemType = equip.itemType
  item1.attributes = equip.attributes
  improveEquipment(item1, lvl)

  const potion = placeholders[1]
  potion.count = 3
  potion.itemType = ItemTypes.MagicPotion
  priceUp(potion, 4)

  placeholders.forEach((x : IBookEntity, i) => {
    if (i < 2) return
    const book = nextBook()
    x.itemType = ItemTypes.Book
    x.skill = book.skill
    priceUp(x, book.cost)
  })
}
