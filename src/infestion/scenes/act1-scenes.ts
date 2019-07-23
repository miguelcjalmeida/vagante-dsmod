import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'

export const slimeInvasion = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWithSlimes(treasure, 60)
}

export const batNest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWithBats(treasure, 20)
}

export const goblinCamp = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWithBandits(treasure, 15)
}

export const troopStronghold = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWithBandits(treasure, 6)
  infestWithBats(treasure, 10)
  infestWithSlimes(treasure, 4)
}

export const theNest = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 1,
    quantity: 80,
    type: EntityTypes.Divebomber,
  })
}

export const lurkerHood = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 12,
    quantity: 3,
    type: EntityTypes.Mimic,
  })

  infestWith(treasure, {
    distance: 12,
    quantity: 3,
    type: EntityTypes.Lurker,
  })
}

export const act1Scenes = [lurkerHood, slimeInvasion, batNest, goblinCamp, troopStronghold, theNest]
