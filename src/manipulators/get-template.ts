import { config } from '../config/config'
import { loadRoom } from '../config/room-loader'

export const dsmod = loadRoom(config.buildroom)
