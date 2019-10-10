const shuffle = require('shuffle-array')

/*export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
*/

export function shuffleArray<T>(array: T[]) {
  shuffle(array)
  shuffle(array)
  shuffle(array)
  return array
}
