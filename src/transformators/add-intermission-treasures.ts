import { IRoomContext } from '../rooms/context'
import { findAct } from '../finders/find-act';
import { RoomNames } from '../rooms/names';
import { addTreasure } from '../manipulators/add-treasure';
import { ChestTypes, ItemTypes } from '../rooms/types';

const INTERMISSION_GROUND_LEVEL = 192
const BONFIRE_CENTER_X = 239

export const addIntermissionTreasures = (context: IRoomContext) => {
  const intermission = findAct(context, RoomNames.Intermission)

  if (!intermission) return

  const room = intermission.rooms[0][0]
  const nest = room.entities

  if (!nest) return

  addTreasure(nest, {
    x: BONFIRE_CENTER_X + 10,
    y: INTERMISSION_GROUND_LEVEL,
    chestType: ChestTypes.Small,
    items: [
      {
        count: 10,
        itemType: ItemTypes.MagicMapping,
        cursed: false,
      },
    ],
  })
}
