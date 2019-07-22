import { ITransformator } from '../transformators/transformator'
import { removeRewardingTreasure } from '../transformators/remove-rewarding-treasure'
import { addIntermissionTreasures } from '../transformators/add-intermission-treasures'
import { infestTreasureArea } from '../transformators/infest-rewarding-treasure'
import { repositionBonfire } from '../transformators/reposition-bonfire';

export const getAllTransformators = () => {
  return [
    infestTreasureArea,
    repositionBonfire,
    removeRewardingTreasure,
    addIntermissionTreasures,
  ]
}
