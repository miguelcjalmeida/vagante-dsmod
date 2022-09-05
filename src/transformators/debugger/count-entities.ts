import { findAct } from "../../finders/find-act";
import { findEntities } from "../../finders/find-entities";
import { IRoomContext } from "../../rooms/context";
import { RoomNames } from "../../rooms/names";
import { EntityTypes } from "../../rooms/types";

export const countEntities = (ctx: IRoomContext) => {
  const act1 = findAct(ctx, RoomNames.BRANCH_FOUR)
  if (act1 === null) return

  const entities = findEntities(act1, (x) => x.type == EntityTypes.Shop);

  entities.forEach(shop => {
    console.log(`room id ${shop.block.uid} one more`)
  });

  console.log('finished counting entities')
}
