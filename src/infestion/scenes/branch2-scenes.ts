import { IChestEntity, IEntity, IPendulumEntity, ISawBladeEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith, DirectionEnum } from '../infest-with'
import { cloneRoomFromTemplate } from '../../manipulators/clone-room-from-template'


export const pendulumPrison = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'uqitisi')
}

export const sawChallenge = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'cizylod')
}

export const carnivorousTrap = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'rihuroz')
}

export const batHoleTrap = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'sahyolu')
}

export const diverBomberNestTwo = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneRoomFromTemplate(treasure.block, 'omehyla')
}

export const branch2Scenes = [
  pendulumPrison,
  sawChallenge,
  carnivorousTrap,
  batHoleTrap,
  diverBomberNestTwo,
]
