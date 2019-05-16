import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'

export type IScene = (treasure: IFindEntityResult<IChestEntity>) => void

export const scenePickerFactory = (scenes: IScene[]) => {

  let currentScene = 0

  return (treasure: IFindEntityResult<IChestEntity>) => {
    const nextScene = scenes[currentScene]

    nextScene(treasure)

    currentScene = currentScene + 1 < scenes.length ? currentScene + 1 : 0
  }
}
