import { IRoomContext } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { findRoomEntities } from '../finders/find-room-entities'
import { EntityTypes, AttributeTypes, ItemTypes } from '../rooms/types'
import { IHoverText } from '../rooms/hovertext'
import * as fs from 'fs'
import { cloneBuildRoomInto } from '../manipulators/clone-room-from-template'
import { improveEquipment } from '../item-builder/improve-equipment';
import { IItemEntity } from '../rooms/entities';
const packageFile = require('../../package.json')

export const versioning = (ctx: IRoomContext) => {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return


  cloneBuildRoomInto(intermission.rooms[4][0], 'eduxelo')

  const texts = findRoomEntities<IHoverText>(
    intermission.rooms[4][0], 
    x => x.type === EntityTypes.HoverText,
  )

  if (texts.length === 0) return

  texts[0].entity.text += ` [${packageFile.version}]`

  console.log(`build version ${packageFile.version}`)
}
