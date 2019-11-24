import { IItemEntity } from '../../rooms/entities'
import { replaceAndreItems } from '../merchant-intermission/replace-andre-items'
import { uniqueId } from '../../tools/unique-id'
import { ItemTypes, EntityTypes } from '../../rooms/types'
import { replaceLenigrastItems } from '../merchant-intermission/replace-lenigrast-items'
import { replaceYoelItems } from '../merchant-intermission/replace-yoel-items'
import { replacePatchesItems } from '../merchant-intermission/replace-patches-items'
import { replaceGreiratItems } from '../merchant-intermission/replace-greirat-items'
import { replaceHandmaidItems } from '../merchant-intermission/replace-handmaid-items'
import { replaceOrbeckItems } from '../merchant-intermission/replace-orbeck-items'
import { replaceIrinaItems } from '../merchant-intermission/replace-irina-items'
import { replaceKarlaItems } from '../merchant-intermission/replace-karla-items'
import { replaceCornyxItems } from '../merchant-intermission/replace-cornyx-items'
import { replaceYuriaItems } from '../merchant-intermission/replace-yuria-items'
import { replaceSirrisItems } from '../merchant-intermission/replace-sirris-items'
import { replaceSiegwardItems } from '../merchant-intermission/replace-siegward-items'
import { replaceGiantItems } from '../merchant-intermission/replace-giant-items'
import { replaceAnriItems } from '../merchant-intermission/replace-anri-items'
import { replaceGavlanItems } from '../merchant-intermission/replace-gavlan-items'

export interface Merchant {
  name: string
  items: IItemEntity[]
}

export type MerchantBuilder = (lvl: number) => Merchant

export const andreBuilder = (lvl: number) => {
  const items = createPlaceholders(4)
  replaceAndreItems(items, lvl)
  return { items, name: 'Blacksmith Andre' }
}

export const lenigrastBuilder = (lvl: number) => {
  const items = createPlaceholders(4)
  replaceLenigrastItems(items, lvl)
  return { items, name: 'Blacksmith Lenigrast' }
}

export const yoelBuilder = (lvl: number) => {
  const items = createPlaceholders(3)
  replaceYoelItems(items)
  return { items, name: 'Yoel of Londor' }
}

export const siegwardBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceSiegwardItems(items)
  return { items, name: 'Siegward of Catarina' }
}

export const patchesBuilder = (lvl: number) => {
  const items = createPlaceholders(4)
  replacePatchesItems(items, lvl)
  return { items, name: 'Unbreakable Patches' }
}

export const greiratBuilder = (lvl: number) => {
  const items = createPlaceholders(4)
  replaceGreiratItems(items, lvl)
  return { items, name: 'Greirat of\nUndead Settlement' }
}

export const handmaidBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceHandmaidItems(items)
  return { items, name: 'Shrine Handmaid' }
}

export const orbeckBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceOrbeckItems(items)
  return { items, name: 'Orbeck of Vinheim' }
}

export const irinaBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceIrinaItems(items)
  return { items, name: 'Irina of Carim' }
}

export const karlaBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceKarlaItems(items, lvl)
  return { items, name: 'Karla' }
}

export const cornyxBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceCornyxItems(items, lvl)
  return { items, name: 'Cornyx of the\nGreat Swamp' }
}

export const yuriaBuilder = (lvl: number) => {
  const items = createPlaceholders(3)
  replaceYuriaItems(items, lvl)
  return { items, name: 'Yuria of Londor' }
}

export const sirrisBuilder = (lvl: number) => {
  const items = createPlaceholders(4)
  replaceSirrisItems(items, lvl)
  return { items, name: 'Sirris of the\nSunless' }
}

export const giantBuilder = (lvl: number) => {
  const items = createPlaceholders(1)
  replaceGiantItems(items, lvl)
  return { items, name: 'Giant of the\nUndead Settlement' }
}

export const anriBuilder = (lvl: number) => {
  const items = createPlaceholders(2)
  replaceAnriItems(items, lvl)
  return { items, name: 'Anri of Astora' }
}

export const gavlanBuilder = (lvl: number) => {
  const items = createPlaceholders(5)
  replaceGavlanItems(items, lvl)
  return { items, name: 'Lonesome Gavlan' }
}


function createPlaceholders(itemCount: number) {
  const items : IItemEntity[] = []

  for (let i = 0; i < itemCount; i += 1) {
    items.push({
      uid: uniqueId(),
      x: 0,
      y: 0,
      count: 1,
      attributes: [],
      cursed: false,
      itemType: ItemTypes.Boomerang,
      type: EntityTypes.Item,
    })
  }

  return items
}
