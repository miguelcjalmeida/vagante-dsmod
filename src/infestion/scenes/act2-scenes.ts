import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'
import { theImpossibleRoom } from '../collection/the-impossible-room'
import { robinwood } from '../collection/robinwood'
import { woodsSecretShop } from '../collection/woodsSecretShop'
import { cloneBuildRoomInto } from '../../manipulators/clone-room-from-template';

export const robinwoodScene = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'myuid2')
}

export const theImpossibleRoomScene = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'tucezya')
}

export const woodsSecretShopScene = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'xusuhat')
}

export const act2Scenes = [robinwoodScene, theImpossibleRoomScene, woodsSecretShopScene]
