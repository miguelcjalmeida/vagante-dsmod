import { IChestEntity } from '../../rooms/entities'
import { IFindEntityResult } from '../../finders/find-entities'
import { infestWithSlimes } from '../infest-with-slimes'
import { infestWithBats } from '../infest-with-bats'
import { infestWithBandits } from '../infest-with-bandits'
import { EntityTypes } from '../../rooms/types'
import { addSimpleEntity } from '../../manipulators/add-simple-entity'
import { infestWith } from '../infest-with'
import { slimeInvasion } from '../collection/act1/slimeInvasion'
import { batNest } from '../collection/act1/batNest'
import { goblinCamp } from '../collection/act1/goblinCamp'
import { flowLikeWater } from '../collection/act1/flowLikeWater'
import { diveNest } from '../collection/act1/diveNest'
import { lurkerhood } from '../collection/act1/lurkerhood'

export const slimeInvasionScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = slimeInvasion.tiles
  treasure.block.entities = slimeInvasion.entities  
}

export const batNestScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = batNest.tiles
  treasure.block.entities = batNest.entities  
}

export const goblinCampScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = goblinCamp.tiles
  treasure.block.entities = goblinCamp.entities  
}

export const flowLikeWaterScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = flowLikeWater.tiles
  treasure.block.entities = flowLikeWater.entities  
}

export const diveNestScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = diveNest.tiles
  treasure.block.entities = diveNest.entities  
}

export const lurkerHoodScene = (treasure: IFindEntityResult<IChestEntity>) => {
  treasure.block.tiles = lurkerhood.tiles
  treasure.block.entities = lurkerhood.entities  
}

export const act1Scenes = [
  lurkerHoodScene, slimeInvasionScene, batNestScene, 
  goblinCampScene, flowLikeWaterScene, diveNestScene,
]
