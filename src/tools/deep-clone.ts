const cloneDeep = require('clone-deep')

export function deepClone<T>(src: T) {
  return cloneDeep(src) as T
}
