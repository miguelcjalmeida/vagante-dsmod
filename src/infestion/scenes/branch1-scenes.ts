import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'
import { cloneRoomFromTemplate } from '../../manipulators/clone-room-from-template';

export const theWormLand = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'acewylu')
}

export const batCave = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'qyodyos')
}

export const banditArena = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'gecyeqy')
}

export const cultismHome = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'ehuxifa')
}

export const deepDive = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'joylagu')
}

export const whoLetTheDogsOut = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'wugyory')
}

export const branch1Scenes = [
  theWormLand, batCave, banditArena, cultismHome, deepDive, whoLetTheDogsOut]
