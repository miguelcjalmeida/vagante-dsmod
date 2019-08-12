import { ChestTypes, ItemTypes } from './types'

export interface IEntity {
  type: string
  x: number
  y: number
}

export interface IChestEntity extends IEntity {
  uid?: string
  chestType: ChestTypes
  type: 'Chest'
  links?: string[]
}

export interface IItemEntity extends IEntity {
  type: 'Item'
  uid: string
  itemType: ItemTypes
  count: number
  cursed: boolean
  attributes?: any[]
}

export interface IPendulumEntity extends IEntity {
  oscillationCycle: number
}

export interface ISawBladeEntity extends IEntity {
  behavior: number
}
