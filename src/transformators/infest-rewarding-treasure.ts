import { IRoomContext, IRoomAct } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes, ChestTypes, ItemTypes } from '../rooms/types'
import { IChestEntity } from '../rooms/entities'
import { addItemIntoTreasure } from '../manipulators/add-item-into-treasure'
import { addTreasure } from '../manipulators/add-treasure'
import { addItem } from '../manipulators/add-item'
import { addSimpleEntity } from '../manipulators/add-simple-entity'
import { infestWithBats } from '../infestion/infest-with-bats'
import { infestWithBandits } from '../infestion/infest-with-bandits'
import { infestWithSlimes } from '../infestion/infest-with-slimes'
import { act1Scenes } from '../infestion/scenes/act1-scenes'
import { scenePickerFactory, IScene } from '../infestion/scenes/scene-picker'
import { findAct } from '../finders/find-act'
import { RoomNames } from '../rooms/names'
import { branch1Scenes } from '../infestion/scenes/branch1-scenes'
import { act2Scenes } from '../infestion/scenes/act2-scenes'

export const infestTreasureArea = (context: IRoomContext) => {
  const act1 = findAct(context, RoomNames.ACT_ONE)
  const act2 = findAct(context, RoomNames.ACT_TWO)
  const act3 = findAct(context, RoomNames.ACT_THREE)
  const branch1 = findAct(context, RoomNames.BRANCH_ONE)

  infestTreasuresOfGivenAct(act1, act2Scenes)
  infestTreasuresOfGivenAct(act2, act2Scenes)
  infestTreasuresOfGivenAct(branch1, branch1Scenes)
}

const infestTreasuresOfGivenAct = (act: IRoomAct | null, scenes: IScene[]) => {
  if (!act) return

  const treasures = findEntities<IChestEntity>(act, (entity: IChestEntity) => {
    return entity.type === EntityTypes.Chest &&
      entity.chestType === ChestTypes.Locked
  })

  // tslint:disable-next-line:max-line-length
  console.log(`the room '${act._comment}' has ${treasures.length} treasure rooms and will be loaded with ${scenes.length} scenes`)

  const pickScene = scenePickerFactory(scenes)

  treasures.forEach((treasure) => {
    pickScene(treasure)
  })
}
