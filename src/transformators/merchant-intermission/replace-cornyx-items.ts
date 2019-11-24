import { IItemEntity, IBookEntity } from '../../rooms/entities'
import { createLotteryPicker } from '../../tools/create-lottery-picker'
import { BookTypes, AttributeTypes, ItemTypes } from '../../rooms/types'
import { shuffleArray } from '../../tools/shuffle-array'
import { priceUp } from '../../item-builder/price-up'
import { equipmentProfiles, EquipmentSubType, EquipmentType } 
  from '../../item-builder/equipment-profile'
import { improveEquipAttr } from '../../item-builder/improve-equipment-attr'
import { improveEquipment } from '../../item-builder/improve-equipment'

const nextBook = createLotteryPicker(
  {
    book: { 
      proportion: 1, 
      possibilities: [
        { skill: BookTypes.FireShield, cost: 1 },
        { skill: BookTypes.Fireball, cost: 3 },
        { skill: BookTypes.FlamePillar, cost: 2 },
      ],
    },
  }, 
)

const nextEquip = createLotteryPicker({
  melee: {
    proportion: 1,
    possibilities: equipmentProfiles
      .filter(x => x.type === EquipmentType.PrimaryWeapon)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.AllWeaponBurn, 0)),
  },
  bow: {
    proportion: 9,
    possibilities: equipmentProfiles
      .filter(x => x.subType === EquipmentSubType.Bow)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.AllWeaponBurn, 1)),
  },
  armor: {
    proportion: 1,
    possibilities: equipmentProfiles
      .filter(x => x.subType === EquipmentSubType.Armor)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.ResistFire, 1)),
  },
  accessory: {
    proportion: 1,
    possibilities: equipmentProfiles
      .filter(x => x.subType === EquipmentSubType.Accessory)
      .map(x => improveEquipAttr({ ...x }, AttributeTypes.FireWalk, 1)),
  },
})


export function replaceCornyxItems(placeholders: IItemEntity[], lvl: number) {
  placeholders.forEach((x : IBookEntity, i) => {
    if (i >= 2) return
    const equip = nextEquip()
    x.itemType = equip.itemType
    x.attributes = equip.attributes
    improveEquipment(x, lvl)
  })

  placeholders.forEach((x : IBookEntity, i) => {
    if (i < 2) return
    const book = nextBook()
    x.itemType = ItemTypes.Book
    x.skill = book.skill
    priceUp(x, book.cost)
  })
}
