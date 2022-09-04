import { characterSelection } from '../transformators/character-selection'
import { itemsCreator } from '../transformators/items-creator'
import { merchantIntermission } from '../transformators/merchant-intermission'
import { cloneDsMod } from '../transformators/clone-dsmod'
import { removeDoors } from '../transformators/remove-doors'
import { fairyReplace } from '../transformators/fairy-replace'
import { versioning } from '../transformators/versioning'
import { roomInstances } from '../transformators/room-instances'
import { labelFirekeepr } from '../transformators/label-firekeeper'
import { godMod } from '../transformators/debugger/god-mod'
import { bareBonesIntermission } from '../transformators/debugger/bare-bones-intermission'
import { config } from '../config/config'

export const getAllTransformators = () => {
  var allTransformators = [
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

  if (config.debugMode) {
    allTransformators.push(godMod)
    allTransformators.push(bareBonesIntermission)
  }

  return allTransformators
}

