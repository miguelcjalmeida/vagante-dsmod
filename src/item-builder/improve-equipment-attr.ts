import { IItemEntity } from '../rooms/entities'
import { AttributeTypes } from '../rooms/types'
import { IEquipmentProfile } from './equipment-profile'

export function improveEquipAttr(
  equip: IEquipmentProfile, 
  attrType: AttributeTypes, 
  levelupValue: number,
) {
  if (!equip.attributes) equip.attributes = []

  const equipAttrs = [...equip.attributes]
  const equipAttr = equipAttrs.find(x => x[0] === attrType)
  equip.attributes = equipAttrs

  if (equipAttr) {
    equipAttr[1] += levelupValue
    return equip
  }

  equipAttrs.push([attrType, levelupValue])
  return equip
}
