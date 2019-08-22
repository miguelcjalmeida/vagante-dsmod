import * as fs from 'fs'
import { IRoomContext } from '../rooms/context'

function getTemplate() {
  const templateDir = `D:/Games/SteamLibrary/steamapps/common/vagante/custom/buildroom`

  const rooms = JSON.parse(fs.readFileSync(`${templateDir}/rooms.json`, 'utf8')) as IRoomContext

  return rooms
}

function getDsmodTemplate() {
  const templateDir = `D:/Games/SteamLibrary/steamapps/common/vagante/custom/dsmod`

  const rooms = JSON.parse(fs.readFileSync(`${templateDir}/rooms.json`, 'utf8')) as IRoomContext

  return rooms
}

export const buildroom = getTemplate()
export const dsmod = getDsmodTemplate()
