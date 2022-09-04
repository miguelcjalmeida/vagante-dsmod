import { findAct } from "../../finders/find-act"
import { findEntities } from "../../finders/find-entities"
import { equipmentProfiles } from "../../item-builder/equipment-profile"
import { IRoomAct, IRoomContext } from "../../rooms/context"
import { IItemEntity } from "../../rooms/entities"
import { RoomNames } from "../../rooms/names"
import { AttributeTypes, EntityTypes } from "../../rooms/types"
import { deepClone } from "../../tools/deep-clone"

export const godMod = (ctx: IRoomContext) => {
  const act = findAct(ctx, RoomNames.ACT_ONE)
  if (act === null) return
  replaceActItemsWithDebugItem(act)
}

function replaceActItemsWithDebugItem(act: IRoomAct) {
  const items = findEntities<IItemEntity>(
    act,
    x => x.type === EntityTypes.Item
      && equipmentProfiles[(<IItemEntity>x).itemType] !== undefined,
  )

  items.forEach((item) => {
    replaceItemForDebugItem(item.entity)
  })
}

function replaceItemForDebugItem(
  equip: IItemEntity
) {

  if (!equip.attributes) equip.attributes = []
  equip.attributes = deepClone(equip.attributes)
  equip.attributes.push([AttributeTypes.Def, 999])
  equip.attributes.push([AttributeTypes.Dex, 999])
  equip.attributes.push([AttributeTypes.Str, 999])
  equip.attributes.push([AttributeTypes.Vit, 999])
  equip.attributes.push([AttributeTypes.GrabWalls, 1])
  equip.attributes.push([AttributeTypes.TrippleJump, 1])
  equip.attributes.push([AttributeTypes.FeatherFall, 1])
  equip.attributes.push([AttributeTypes.TrueSight, 1])
  equip.attributes.push([AttributeTypes.AmuletReincarnate, 1])
  equip.attributes.push([AttributeTypes.PhaseHorizontal, 1])
  equip.attributes.push([AttributeTypes.PhaseVertical, 1])
}


