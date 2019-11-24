import { IItemEntity } from '../rooms/entities'
import { AttributeTypes } from '../rooms/types'

const possibilites = [
  AttributeTypes.Str,
  AttributeTypes.Dex,
  AttributeTypes.Vit,
  AttributeTypes.Spd,
  AttributeTypes.Int,
  AttributeTypes.Luk,
  AttributeTypes.Def,
  AttributeTypes.ResistFire,
  AttributeTypes.ResistCold,
  AttributeTypes.ResistPoison,
  AttributeTypes.ResistElec,
  AttributeTypes.ResistAll,
]

export function priceUp(item: IItemEntity, level: number) {
  if (!item.attributes) item.attributes = []
  else item.attributes = [...item.attributes]

  const monetaryValue = level >= 0 ? 0 : -1

  for (let i = 0; i < Math.abs(level) && i < possibilites.length; i += 1) {
    item.attributes.push([possibilites[i], monetaryValue])
  }
}
