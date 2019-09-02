export const nextItemFactory = <T>(list: T[]) => {
  let cursor = 0

  return () => {
    if (cursor + 1 < list.length) {
      const result = list[cursor]
      cursor += 1
      return result
    }

    cursor = 1
    return list[0]
  }
}

export type INextOf<T> = () => T 
