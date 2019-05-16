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
    quantity: 6,
    type: EntityTypes.Worm,
  })
}

export const act2Scenes = [robinwood]
