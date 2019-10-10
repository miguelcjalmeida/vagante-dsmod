import { ITransformator } from '../transformators/transformator'
import { characterSelection } from '../transformators/character-selection'
import { itemsCreator } from '../transformators/items-creator'
import { labelIntermission } from '../transformators/label-intermissions'
import { surpriseBox } from '../transformators/surprise-box'
import { scarceland } from '../transformators/scarceland'
import { merchantIntermission } from '../transformators/merchant-intermission'
import { cloneDsMod } from '../transformators/clone-dsmod'
import { removeDoors } from '../transformators/remove-doors'
import { fairyReplace } from '../transformators/fairy-replace'
import { simplifyGeneration } from '../transformators/simplify-generation'
import { partyUpMod } from '../transformators/partyup-mod'
import { versioning } from '../transformators/versioning'
import { roomInstances } from '../transformators/room-instances'

export const getAllTransformators = () => {
  return [
    cloneDsMod,
    roomInstances,
    itemsCreator,
    merchantIntermission,
    characterSelection, 
    removeDoors,
    fairyReplace,
    versioning,
    
    // partyUpMod,
    // saveIntoTemplate,
    // scarceland,
  ]
}

