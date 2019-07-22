import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith, DirectionEnum } from '../infest-with'

export const slimesFromTheSkies = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 5,
    quantity: 40,
    type: EntityTypes.Slime,
    direction: DirectionEnum.leftOnly,
    distanceOffset: - 220,
  })

  infestWith(treasure, {
    distance: 5,
    quantity: 40,
    type: EntityTypes.Slime,
    direction: DirectionEnum.leftOnly,
    distanceOffset: - 220,
    elevation: 30,
  })

  infestWith(treasure, {
    distance: 5,
    quantity: 40,
    type: EntityTypes.Slime,
    direction: DirectionEnum.leftOnly,
    distanceOffset: - 220,
    elevation: 50,
  })
}

export const towerForest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 25,
    quantity: 16,
    type: EntityTypes.ManEatingPlant,
    direction: DirectionEnum.centerToBothSides,
  })

  infestWith(treasure, {
    distance: 30,
    quantity: 6,
    type: EntityTypes.Spprigan,
    direction: DirectionEnum.centerToBothSides,
  })

  infestWith(treasure, {
    distance: 25,
    quantity: 16,
    type: EntityTypes.Lurker,
    direction: DirectionEnum.centerToBothSides,
  })
}

export const harpyNest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 25,
    quantity: 10,
    elevation: 40,
    type: EntityTypes.Harpy,
    direction: DirectionEnum.rightOnly,
  })
}

export const branch2Scenes = [slimesFromTheSkies, harpyNest, towerForest]
