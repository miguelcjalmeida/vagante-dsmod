import { getAllTransformators } from './get-all-transformators'
import { config } from '../config/config'
import { loadRoom, saveRoom } from '../config/room-loader'

export function applyMod() {
  const rooms = loadRoom(config.asset('rooms.json'))
  getAllTransformators().forEach(transform => transform(rooms))
  saveRoom(config.dist('rooms.json'), rooms)
}
