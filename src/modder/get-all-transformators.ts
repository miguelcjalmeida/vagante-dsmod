import { ITransformator } from '../transformators/transformator'
import { characterSelection } from '../transformators/character-selection'
import { itemsCreator } from '../transformators/items-creator'
import { labelIntermission } from '../transformators/label-intermissions'
import { lobby } from '../transformators/lobby'
import { surpriseBox } from '../transformators/surprise-box'
import { scarceland } from '../transformators/scarceland'
import { merchantIntermission } from '../transformators/merchant-intermission'
import { infestTreasureArea } from '../transformators/infest-rewarding-treasure'
import { changeTreasureByKeys } from '../transformators/change-treasure-by-keys'

export const getAllTransformators = () => {
  return [
    // lobby,
    infestTreasureArea,
    changeTreasureByKeys,
    merchantIntermission,
    itemsCreator,
    characterSelection,
    // scarceland,
    // labelIntermission,
  ]
}
