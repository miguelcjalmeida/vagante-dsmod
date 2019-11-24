import { IRoomContext } from '../rooms/context'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { findRoomEntities } from '../finders/find-room-entities'
import { EntityTypes} from '../rooms/types'
import { IHoverText } from '../rooms/hovertext'
const packageFile = require('../../package.json')

export const versioning = (ctx: IRoomContext) => {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  const texts = findRoomEntities<IHoverText>(
    intermission.rooms[4][0], 
    x => x.type === EntityTypes.HoverText,
  )

  const credits = [
    ['Scotilen', 'for modding non-stop'],
    ['Krystal', 'for Velvette\'s, custom designs, and emotional support'],
    ['Douchel', 'for bunch of intermissions, custom rooms, and ideas'],
    ['arifallen23', 'for Fire Keeper!'],
    ['The Last Ranger', 'for balancing and planting ideas'],
    ['Blue', 'for making me excited at modding fresh content'],
    ['Bagelrama', 'for helping me scratch the binary code'],
    ['ddavidd', 'for doors removing script'],
    ['seth', 'for breaking the game'],
  ]

  if (texts.length < 1) return
  texts[0].entity.text += ` [${packageFile.version}]`

  if (texts.length < 2) return
  texts[1].entity.text += ' ' + credits
    .map(x => `${x[0]}`)
    .join(', ')
    .replace(`${credits[6][0]}, `, `${credits[6][0]},\n`)

  console.log(texts[1].entity.text)
  console.log(`build version ${packageFile.version}`)
}
