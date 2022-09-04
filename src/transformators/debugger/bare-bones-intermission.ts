import { findAct } from "../../finders/find-act"
import { findEntities, IFindEntityResult } from "../../finders/find-entities"
import { findRoomEntities } from "../../finders/find-room-entities"
import { IRoom, IRoomAct, IRoomBlock, IRoomContext } from "../../rooms/context"
import { IEntity } from "../../rooms/entities"
import { IHoverText } from "../../rooms/hovertext"
import { RoomNames } from "../../rooms/names"
import { EntityTypes } from "../../rooms/types"
import { deepClone } from "../../tools/deep-clone"

export const bareBonesIntermission = (context: IRoomContext) => {
  const intermission = findAct(context, RoomNames.Intermission)
  if (!intermission) return

  setEmptyIntermissionTemplate(intermission, '0')
  setEmptyIntermissionTemplate(intermission, '1')
  setEmptyIntermissionTemplate(intermission, '2')
  setEmptyIntermissionTemplate(intermission, '3')
  setEmptyIntermissionTemplate(intermission, '5')
  setEmptyIntermissionTemplate(intermission, '6')
  setEmptyIntermissionTemplate(intermission, '7')
  setEmptyIntermissionTemplate(intermission, '8')
  setEmptyIntermissionTemplate(intermission, '10')
  setEmptyIntermissionTemplate(intermission, '11')
  setEmptyIntermissionTemplate(intermission, '12')
  setEmptyIntermissionTemplate(intermission, '13')
  setEmptyIntermissionTemplate(intermission, '14')
}

function setEmptyIntermissionTemplate(act: IRoomAct, type: string) {
  act.rooms[type] = deepClone([act.rooms['14'][0]])
  const message = `intermission type ${type}`
  const idPlaceholders = getRoomIDPlaceHolders(act.rooms[type][0])

  idPlaceholders.forEach((x) => {
    const text = <IHoverText>x.entity
    text.text = message
  })
}

function getRoomIDPlaceHolders(roomBlock: IRoomBlock) : IFindEntityResult<IEntity>[] {
  const placeholders = findRoomEntities(roomBlock, x => x.type === EntityTypes.HoverText)

  const idPlaceholders = placeholders.filter((x) => {
    if (x.entity.type !== EntityTypes.HoverText) return false
    const text = <IHoverText>x.entity

    return text.text === 'ROOMID'
  })

  return idPlaceholders
}
