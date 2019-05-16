import { IEntity } from './entities'

export interface IRoomContext {
  acts: IRoomAct[]
}

export interface IRoomAct {
  _comment: string
  rooms: IRooms
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


