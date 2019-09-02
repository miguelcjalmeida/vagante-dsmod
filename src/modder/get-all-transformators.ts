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
import { cloneDsMod } from '../transformators/clone-dsmod'
import { removeDoors } from '../transformators/remove-doors'
import { placeholderReplace } from '../transformators/placeholder-replace'
import { simplifyGeneration } from '../transformators/simplify-generation'

export const getAllTransformators = () => {
  return [
    // lobby,
    cloneDsMod,
    infestTreasureArea,
    changeTreasureByKeys,
    merchantIntermission,
    itemsCreator,
    characterSelection, 
    removeDoors,
    placeholderReplace,
    
    // saveIntoTemplate,
    // scarceland,
    // labelIntermission,
  ]
}

