import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'

export const theWormLand = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 4,
    quantity: 6,
    type: EntityTypes.Worm,
  })

  infestWith(treasure, {
    distance: 13,
    quantity: 15,
    type: EntityTypes.Crawler,
  })
}

export const batCave = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 1,
    quantity: 30,
    type: EntityTypes.Bat,
  })
}

export const cultismInterrupted = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 2,
    quantity: 5,
    type: EntityTypes.Cultist,
    elevation: 30,
  })

  infestWith(treasure, {
    distance: 30,
    quantity: 2,
    type: EntityTypes.DemonKnight,
  })

  infestWith(treasure, {
    distance: 10,
    quantity: 2,
    type: EntityTypes.DemonDog,
  })

  infestWith(treasure, {
    distance: 0,
    quantity: 1,
    type: EntityTypes.Lurker,
  })
}

export const branch1Scenes = [theWormLand, batCave, cultismInterrupted]
