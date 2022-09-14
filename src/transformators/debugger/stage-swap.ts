import { findAct } from "../../finders/find-act";
import { IActSpecification, IRoomAct, IRoomContext } from "../../rooms/context";
import { RoomNames } from "../../rooms/names";

export const stageSwap = (ctx: IRoomContext) => {
  const actNameToSwap1 = RoomNames.ACT_ONE
  const actNameToSwap2 = RoomNames.FinalFight

  const act1 = findAct(ctx, actNameToSwap1)
  const act2 = findAct(ctx, actNameToSwap2)

  if (!act1 || !act2) return

  var spec1 = ctx.act_specifications.filter(x => x._comment === actNameToSwap1)[0]
  var spec2 = ctx.act_specifications.filter(x => x._comment === actNameToSwap2)[0]

  swapSpecDimension(spec1, spec2)
  swapRooms(act1, act2)
  console.log('acts swapped')
}


function swapSpecDimension(spec1: IActSpecification, spec2: IActSpecification) {
  var width1 = spec1.width
  var height1 = spec1.height
  spec1.width = spec2.width
  spec1.height = spec2.height
  spec2.width = width1
  spec2.height = height1
}

function swapRooms(act1: IRoomAct, act2: IRoomAct) {
  var rooms1 = act1.rooms
  act1.rooms = act2.rooms
  act2.rooms = rooms1
}

