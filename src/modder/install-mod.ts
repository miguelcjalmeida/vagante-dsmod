import * as fs from 'fs'
import { getAllTransformators } from './get-all-transformators'
import { IRoomContext } from '../rooms/context'
import { applyMod } from './apply-mod'
import { spawn } from 'child_process'
import * as Shell from 'node-powershell'

export function installMod() {
  applyMod()

  const roomsPath = `${__dirname}/../../dist/rooms.json`
  const vagantePath = 'D:/Games/SteamLibrary/steamapps/common/vagante'
  const installModPath = `${vagantePath}/Mods/DSAlike/rooms.json`
  const modLoaderPath = `${vagantePath}/VaganteModLoader.ps1`

  fs.copyFileSync(roomsPath, installModPath)


  console.log('installing...')

  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  })

  ps.addCommand(`cd ${vagantePath}`)
  ps.addCommand(`./VaganteModLoader.ps1`)

  ps.invoke()
    .then((output) => {
      console.log(output)
      ps.dispose()
    })
    .catch((err) => {
      console.log(err)
    })
}
