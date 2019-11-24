import { ChestTypes, ItemTypes, DoodadTypes, ShrineTypes, BookTypes, AttributeTypes } from './types'

export interface IEntity {
  type: string
  x: number
  y: number
  champion?: number 
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
  attributes?: IItemAttributes
}

export interface IShopEntity extends IEntity {
  uid: string
  type: 'Shop'
  facingLeft: boolean
  size: number
  links: string[] | undefined
}

export type IItemAttributes = [AttributeTypes, number][]

export interface IBookEntity extends IItemEntity {
  skill: BookTypes
}

export interface IShrineEntity extends IEntity {
  godType: ShrineTypes
}

export interface IDoodadEntity extends IEntity {
  doodadType: DoodadTypes
}


export interface IPendulumEntity extends IEntity {
  oscillationCycle: number
}

export interface ISawBladeEntity extends IEntity {
  behavior: number
}
