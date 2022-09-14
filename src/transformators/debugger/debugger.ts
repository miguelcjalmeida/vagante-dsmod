import { IRoomContext } from "../../rooms/context";
import { bareBonesIntermission } from "./bare-bones-intermission";
import { countEntities } from "./count-entities";
import { godMod } from "./god-mod";
import { stageSwap } from "./stage-swap";

export const turnOnDebugger = (ctx: IRoomContext) => {
  godMod(ctx)
  //bareBonesIntermission(ctx)
  //countEntities(ctx)
  //stageSwap(ctx)
}
