import * as fs from 'fs'
import { getAllTransformators } from './get-all-transformators'
import { IRoomContext } from '../rooms/context'
import { template } from '../manipulators/get-template'

export function applyMod() {
  const assetsDir = `${__dirname}/../../assets`
  const distDir = `${__dirname}/../../dist`

  const rooms = JSON.parse(fs.readFileSync(`${assetsDir}/rooms.json`, 'utf8')) as IRoomContext

  getAllTransformators().forEach(transform => transform(rooms))

  fs.writeFileSync(`${distDir}/rooms.json`, JSON.stringify(rooms), { encoding:'utf8', flag:'w' })
  fs.writeFileSync(
    `${distDir}/template-rooms.json`, 
    JSON.stringify(template), 
    { encoding:'utf8', flag:'w' },
  )
}
