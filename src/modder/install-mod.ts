import * as fs from 'fs'
import { applyMod } from './apply-mod'
import * as Shell from 'node-powershell'
import { config } from '../config/config'

export function installMod() {
  applyMod()

  const roomsPath = config.dist('rooms.json')
  const vagantePath =  config.gameRootDir
  const installModPath = config.gameModPath

  fs.copyFileSync(roomsPath, installModPath)

  console.log('installing...')

  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  })

  ps.addCommand(`cd "${vagantePath}"`)
  ps.addCommand(`./VaganteModLoader.ps1`)

  ps.invoke()
    .then((output) => {
      console.log(output)
      ps.dispose()
    })
    .catch((err) => {
      console.log(err)
      ps.dispose()
    })
}
