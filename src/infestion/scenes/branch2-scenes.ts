import { IChestEntity, IEntity, IPendulumEntity, ISawBladeEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith, DirectionEnum } from '../infest-with'

export const diverBomberNestTwo = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    quantity: 80,
    distance: 1,
    elevation: 38,
    type: EntityTypes.Divebomber,
  })
}

export const pendulumPrison = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.nest.push(<IPendulumEntity>{
    type: EntityTypes.PendulumAxe,
    x: 63,
    y: 85,
    oscillationCycle: 1061158913,
  })
  
  treasure.nest.push(<IPendulumEntity>{
    type: EntityTypes.PendulumAxe,
    x: 63,
    y: 95,
    oscillationCycle: 1055158913,
  })

  infestWith(treasure, {
    type: EntityTypes.Goblin,
    distance: 15,
    quantity: 8,
    direction: DirectionEnum.leftOnly,
    distanceOffset: 15,
  })
}

export const batHoleTrap = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.nest.push({
    x: treasure.entity.x + 4 * 16,
    y: treasure.entity.y + 40,
    type: EntityTypes.BoulderTrap,
  })

  treasure.nest.push({
    x: treasure.entity.x - 4 * 16,
    y: treasure.entity.y + 32,
    type: EntityTypes.Spikes,
  })

  infestWith(treasure, {
    type: EntityTypes.Bat,
    quantity: 9,
    distance: 15,
    elevation: 40, 
  })
}

export const carnivorousTrap = (treasure: IFindEntityResult<IChestEntity>) => {
  infestWith(treasure, {
    distance: 15,
    quantity: 3,
    type: EntityTypes.ManEatingPlant,
    direction: DirectionEnum.centerToBothSides,
  })

  for (let i = 0; i < 3; i += 1) {
    treasure.nest.push({
      type: EntityTypes.Boulder,
      x: treasure.entity.x + 16,
      y: treasure.entity.y - (i * 32),
    })
  }
}

export const sawChallenge = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.nest.push(<ISawBladeEntity>{
    type: EntityTypes.SawBlade,
    x: 47.1436 + 32,
    y: 120.565 - 32,
    behavior: 2,
  })

  treasure.nest.push(<ISawBladeEntity>{
    type: EntityTypes.SawBlade,
    x: 47.1436 + 64,
    y: 120.565 - 48,
    behavior: 2,
  })

  treasure.nest.push(<ISawBladeEntity>{
    type: EntityTypes.SawBlade,
    x: 47.1436 + 64,
    y: 120.565 - 48,
    behavior: 2,
  })
}

export const branch2Scenes = [
  pendulumPrison,
  sawChallenge,
  carnivorousTrap,
  batHoleTrap,
  diverBomberNestTwo,
]
