import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith, DirectionEnum } from '../infest-with'

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

export const theBait = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 1,
    quantity: 5,
    type: EntityTypes.Piranha,
    distanceOffset: -35,
  })

  infestWith(treasure, {
    distance: 1,
    quantity: 5,
    type: EntityTypes.Piranha,
    distanceOffset: -33,
  })

  infestWith(treasure, {
    distance: 1,
    quantity: 5,
    type: EntityTypes.Piranha,
    distanceOffset: -32,
  })

  infestWith(treasure, {
    distance: 1,
    quantity: 5,
    type: EntityTypes.Piranha,
    distanceOffset: -31,
  })

  infestWith(treasure, {
    distance: 4,
    quantity: 10,
    type: EntityTypes.Lurker,
    distanceOffset: -58,
    direction: DirectionEnum.rightOnly,
  })
}

export const act4Scenes = [theBait, dragonNest]
