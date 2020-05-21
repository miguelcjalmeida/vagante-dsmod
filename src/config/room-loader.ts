import * as fs from 'fs'
import { IRoomContext } from '../rooms/context'

export function loadRoom(path: string) {
  console.log(`${path} loading`)
  const content = fs.readFileSync(path, 'utf8')
  return JSON.parse(content) as IRoomContext
}

export function saveRoom(path: string, rooms: IRoomContext) {
  fs.writeFileSync(path, JSON.stringify(rooms), { encoding:'utf8', flag:'w' })
}
