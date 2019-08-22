import { IRoomContext, IRoomBlock } from '../rooms/context'

export const cloneRoom = (targetRoom: IRoomBlock, modelRoom: IRoomBlock) => {
  targetRoom.entities = deepCopy(modelRoom.entities)
  targetRoom.tiles = modelRoom.tiles
}

function deepCopy(obj: any) {
  let copy : any

  if (null == obj || 'object' !== typeof obj) return obj

  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i += 1) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr])
    }

    return copy
  }

  throw new Error('Type not supported for deep coping')
}
