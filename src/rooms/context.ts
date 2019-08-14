import { IEntity } from './entities'

export interface IRoomContext {
  acts: IRoomAct[]
  act_specifications: IActSpecification[]
}

export interface IRoomAct {
  _comment: string
  rooms: IRooms
}

export interface IActSpecification {
  _comment: string
  width: number
  height: number
}

export interface IRooms {
  [key: string]: IRoom
}

export type IRoom = IRoomBlock[]

export interface IRoomBlock {
  uid: string
  name: string
  tiles: IRoomTile[]
  entities?: IEntity[]
}

export type IRoomTile = number[]


