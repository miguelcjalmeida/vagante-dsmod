import { characterSelection } from '../transformators/character-selection'
import { itemsCreator } from '../transformators/items-creator'
import { merchantIntermission } from '../transformators/merchant-intermission'
import { cloneDsMod } from '../transformators/clone-dsmod'
import { removeDoors } from '../transformators/remove-doors'
import { fairyReplace } from '../transformators/fairy-replace'
import { versioning } from '../transformators/versioning'
import { roomInstances } from '../transformators/room-instances'
import { labelFirekeepr } from '../transformators/label-firekeeper'

export const getAllTransformators = () => {
  return [
    cloneDsMod,
    roomInstances,
    itemsCreator,
    merchantIntermission,
    characterSelection, 
    removeDoors,
    labelFirekeepr,
    fairyReplace,
    versioning,
    
    // recalcCharSelection,
    // partyUpMod,
    // saveIntoTemplate,
    // scarceland,
  ]
}

