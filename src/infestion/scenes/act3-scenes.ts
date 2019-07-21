import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'

export const hauntedHouse = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 5,
    quantity: 8,
    type: EntityTypes.Ghost,
  })
}

export const piranhada = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 3,
    quantity: 12,
    type: EntityTypes.Piranha,
  })
}

export const act3Scenes = [piranhada, hauntedHouse]
