import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'

export const robinwood = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 4,
    quantity: 12,
    type: EntityTypes.Spprigan,
  })

  infestWith(treasure, {
    quantity: 1,
    distance: 0,
    type: EntityTypes.ManEatingPlant,
  })
}

export const cannibalForest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 4,
    quantity: 12,
    type: EntityTypes.ManEatingPlant,
  })
}

export const thiefCamp = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 10,
    quantity: 4,
    type: EntityTypes.Thief,
  })

  infestWith(treasure, {
    distance: 5,
    quantity: 8,
    type: EntityTypes.Goblin,
  })
}

export const act2Scenes = [robinwood, cannibalForest, thiefCamp]
