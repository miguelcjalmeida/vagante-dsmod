import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith, DirectionEnum } from '../infest-with'
import { cloneBuildRoomInto } from '../../manipulators/clone-room-from-template'


export const theBait = (treasure: IFindEntityResult<IChestEntity>) => {
  cloneBuildRoomInto(treasure.block, 'tejuhye')
}

export const dragonNest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 0,
    quantity: 1,
    type: EntityTypes.ZombieDragon,
  })

  infestWith(treasure, {
    distance: 0,
    quantity: 1,
    type: EntityTypes.BabyDragon,
    distanceOffset: -40,
  })

  infestWith(treasure, {
    distance: 0,
    quantity: 1,
    type: EntityTypes.BabyDragon,
    distanceOffset: 40,
  })
}

export const act4Scenes = [theBait, dragonNest]
