import { IRoomContext, IRoomBlock, IActSpecification, IRoomAct } from '../rooms/context'
import { RoomNames } from '../rooms/names';
import { addLabel } from '../manipulators/add-label';


export const labelFirekeepr = (ctx: IRoomContext) => {
  console.log('labeling firekeepr')

  ctx.acts.forEach((act) => {

    if (act._comment === RoomNames.Tutorial) return 

    for (const i in act.rooms) {
      const room = act.rooms[i]
      room.forEach((block, line) => {
        addFirekeeperLabel(act, block)
      })
    }
  })
}

function addFirekeeperLabel(act: IRoomAct, block: IRoomBlock) {
  const tilesIndex = -1

  block.tiles.forEach((rowTiles, line) => {
    for (let i = 0; i < rowTiles.length; i += 6) {
      const foreTileIndex = i + 4
      const foreTile = rowTiles[foreTileIndex]
  
      if (foreTile !== 640 && foreTile !== 704) continue

      if (!block.entities) block.entities = []
      
      addLabel(block.entities, {
        text: 'Fire Keeper',
        x: i * 16 / 6,
        y: line * 16 + 16,
        triggerWidth: 48,
        triggerOffsetX: -16,
        triggerOffsetY: -16,
        triggerHeight: 64,
      })
    }
  })
}
