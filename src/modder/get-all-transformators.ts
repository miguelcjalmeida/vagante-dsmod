import { ITransformator } from '../transformators/transformator'
import { removeRewardingTreasure } from '../transformators/remove-rewarding-treasure'
import { addIntermissionTreasures } from '../transformators/add-intermission-treasures'
import { infestTreasureArea } from '../transformators/infest-rewarding-treasure'

export const getAllTransformators = () => {
  return [
    infestTreasureArea,
    removeRewardingTreasure,
    addIntermissionTreasures,
  ]
}
