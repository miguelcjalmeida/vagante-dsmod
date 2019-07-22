import { IEntity } from './entities'

export interface IHoverText extends IEntity {
  uid: string
  w: number
  h: number
  text: string
  animated: boolean
  animDelay: number
}

export interface ITriggerCondition extends IEntity {
  type: TriggerTypes
}

export enum TriggerTypes {
  touchingPlayer = 'TOUCHING_PLAYER',
}

export interface ITrigger extends IEntity {
  uid: string
  links: string[]
  x: number
  y: number
  w: number
  h: number
  condition: ITriggerCondition
}
