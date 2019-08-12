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

export const robinwoodScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = robinwood.tiles
  treasure.block.entities = robinwood.entities
}

export const theImpossibleRoomScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = theImpossibleRoom.tiles
  treasure.block.entities = theImpossibleRoom.entities
}

export const woodsSecretShopScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = woodsSecretShop.tiles
  treasure.block.entities = woodsSecretShop.entities
}

export const act2Scenes = [robinwoodScene, theImpossibleRoomScene, woodsSecretShopScene]
