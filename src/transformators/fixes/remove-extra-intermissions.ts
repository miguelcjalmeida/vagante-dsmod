import { findAct } from "../../finders/find-act";
import { IRoomContext } from "../../rooms/context";
import { RoomNames } from "../../rooms/names";

export const removeExtraIntermissions = (ctx: IRoomContext) => {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return
  delete intermission.rooms['15']
}
