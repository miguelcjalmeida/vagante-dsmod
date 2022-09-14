import { findAct } from "../../finders/find-act";
import { IRoomContext } from "../../rooms/context";
import { RoomNames } from "../../rooms/names";

export const removeExtraIntermissions = (ctx: IRoomContext) => {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return
  if (intermission.rooms['15']) delete intermission.rooms['15']
}
