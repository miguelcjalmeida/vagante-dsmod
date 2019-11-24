import { IEntity, IChestEntity } from '../rooms/entities'
import { uniqueId } from '../tools/unique-id'
import { EntityTypes, ChestTypes } from '../rooms/types'
import { IHoverText, ITrigger, TriggerTypes } from '../rooms/hovertext'

export const addLabel = (nest: IEntity[], label: ILabelOptions) => {
  const labelId = uniqueId()

  const textParts = label.text.split('\n')
  const textSize = textParts
    .reduce((previous, current) => previous.length < current.length ? current : previous)
    .length

  const centeredTextParts = textParts.map((x) => {
    const leftAppendSize = Math.floor(textSize - x.length / 2)
    return ' '.repeat(leftAppendSize < 0 ? 0 : leftAppendSize) + x
  })

  nest.push(<IHoverText>{
    uid: labelId,
    type: EntityTypes.HoverText,
    x: label.x + (label.labelOffsetX ? label.labelOffsetX : 0) - (textSize * 10.5) / 2 ,
    y: label.y + (label.labelOffsetY ? label.labelOffsetY : 0) - (textParts.length * 13),
    w: 32,
    h: 32,
    text: centeredTextParts.join('\n'),
    animated: true,
    animDelay: 0,
  })

  nest.push(<ITrigger>{
    uid: uniqueId(),
    links: [labelId],
    type: EntityTypes.Trigger,
    x: label.x + (label.triggerOffsetX ? label.triggerOffsetX : 0),
    y: label.y + (label.triggerOffsetY ? label.triggerOffsetY : 0),
    w: label.triggerWidth ? label.triggerWidth  : 15,
    h: label.triggerHeight ? label.triggerHeight : 30,
    condition: {
      type: TriggerTypes.touchingPlayer,
    },
  })
}

export interface ILabelOptions {
  x: number
  y: number
  text: string
  triggerOffsetX?: number 
  triggerOffsetY?: number
  labelOffsetX?: number
  labelOffsetY?: number
  triggerWidth?: number
  triggerHeight?: number
}
