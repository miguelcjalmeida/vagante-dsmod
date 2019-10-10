import { IRoomContext, IRoomBlock } from '../rooms/context'
import { RoomNames } from '../rooms/names'
import { findAct } from '../finders/find-act'
import { EntityTypes, DoodadTypes, ShrineTypes, ItemTypes } from '../rooms/types'
import { IDoodadEntity, IShrineEntity } from '../rooms/entities'
import { findRoomEntities } from '../finders/find-room-entities'
import { IHoverText } from '../rooms/hovertext'
import { addItem } from '../manipulators/add-item'

const bonfireIntermissions = ['1', '3', '6', '8', '13', '14']
const lobbyIntermissions = ['4', '9', '0']

export const partyUpMod = (ctx: IRoomContext) => {
  console.log('applying mod for party of four')
  adjustMerchantHub(ctx)
  changeLobbyText(ctx)
}

function changeLobbyText(ctx: IRoomContext) {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  const texts = findRoomEntities<IHoverText>(
    intermission.rooms['4'][0], x => x.type === EntityTypes.HoverText)

  texts.forEach(x => x.entity.text += ' (scarcity)')
}

function adjustMerchantHub(ctx: IRoomContext) {
  const intermission = findAct(ctx, RoomNames.Intermission)
  if (!intermission) return

  for (const i in intermission.rooms) {
    if (lobbyIntermissions.indexOf(i) >= 0) continue

    const isBonfireIntermission = bonfireIntermissions.indexOf(i) >= 0
    const block = intermission.rooms[i][0]

    removeDummy(block)

    if (isBonfireIntermission) continue

    switchForgeByWell(block)
    removeBonfire(block)
  }
}

function removeDummy(block: IRoomBlock) {
  if (!block.entities) return

  const dummyIndex = block.entities.findIndex(x => 
    x.type === EntityTypes.Doodad &&
    (<IDoodadEntity>x).doodadType === DoodadTypes.Dummy)

  if (dummyIndex >= 0) block.entities.splice(dummyIndex, 1)

  const labelIndex = block.entities.findIndex(x => 
    x.type === EntityTypes.HoverText &&
    (<IHoverText>x).text.toLowerCase() === 'loan scarecrow')

  if (labelIndex >= 0) block.entities.splice(labelIndex, 1)
}

function switchForgeByWell(block: IRoomBlock) {
  const forges = findRoomEntities<IShrineEntity>(
    block, 
    x => x.type === EntityTypes.Shrine &&
      (<IShrineEntity>x).godType === ShrineTypes.Forge, 
  )

  forges.forEach((forge) => {
    forge.entity.godType = ShrineTypes.Well
  })

  const texts = findRoomEntities<IHoverText>(
    block, 
    x => x.type === EntityTypes.HoverText &&
      (<IHoverText>x).text.toLowerCase() === 'poorsmith', 
  )

  texts.forEach((text) => {
    text.entity.text = 'Youth Well'
  })
}

function removeBonfire(block: IRoomBlock) {
  if (!block.entities) return

  const bonfire = <IDoodadEntity | null>block.entities.find(x => x.type === EntityTypes.Bonfire)

  if (!bonfire) return

  bonfire.type = EntityTypes.Doodad
  bonfire.doodadType = DoodadTypes.Table

  addItem(block.entities, {
    count: 1,
    cursed: false,
    itemType: ItemTypes.Chicken,
    x: bonfire.x + 7,
    y: bonfire.y - 15,
  })
}
