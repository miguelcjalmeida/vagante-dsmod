export const nextItemFactory = <T>(list: T[], onNextItemReset?: (list: T[]) => void) => {
  let cursor = 0

  return () => {
    if (cursor < list.length) {
      const result = list[cursor]
      cursor += 1
      return result
    }

    if (onNextItemReset) onNextItemReset(list)
    cursor = 1
    return list[0]
  }
}

export type INextOf<T> = () => T 
