import { IRoomContext, IRoomBlock, IActSpecification, IRoomAct } from '../rooms/context'
import { RoomNames } from '../rooms/names';


export const removeDoors = (ctx: IRoomContext) => {
  console.log('removing doors')

  ctx.acts.forEach((act) => {

    if (act._comment === RoomNames.Tutorial) return 

    for (const i in act.rooms) {
      const room = act.rooms[i]
      room.forEach((block) => {
        removeDoorFromBlock(act, block)
      })
    }
  })
}

function removeDoorFromBlock(act: IRoomAct, block: IRoomBlock) {
  const tilesIndex = -1

  block.tiles.forEach((rowTiles) => {
    for (let i = 0; i < rowTiles.length; i += 6) {
      const midTileIndex = i + 3
      const midTile = rowTiles[midTileIndex]
  
      if (midTile !== 0 && midTile !== 1) continue

      rowTiles[midTileIndex] = -1
    }
  })
}
