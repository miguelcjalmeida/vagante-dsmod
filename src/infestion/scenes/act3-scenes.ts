import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'
import { cloneBuildRoomInto } from '../../manipulators/clone-room-from-template';


export const shootingTrap = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'jutuvye')
}

export const hauntedHouse = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'falapyl')
}

export const act3Scenes = [shootingTrap, hauntedHouse]
