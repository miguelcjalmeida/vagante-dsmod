import { IEntity, IChestEntity } from '../rooms/entities'
import { uniqueId } from '../tools/unique-id'
import { EntityTypes, ChestTypes } from '../rooms/types'
import { IHoverText, ITrigger, TriggerTypes } from '../rooms/hovertext'

export const addLabel = (nest: IEntity[], label: ILabelOptions) => {
  const labelId = uniqueId()

  nest.push(<IHoverText>{
    uid: labelId,
    type: EntityTypes.HoverText,
    x: label.x - (label.text.length * 4) / 2,
    y: label.y - 15,
    w: 32,
    h: 32,
    text: label.text,
    animated: true,
    animDelay: 0,
  })

  nest.push(<ITrigger>{
    uid: uniqueId(),
    links: [labelId],
    type: EntityTypes.Trigger,
    x: label.x,
    y: label.y,
    w: 15,
    h: 30,
    condition: {
      type: TriggerTypes.touchingPlayer,
    },
  })
}

export interface ILabelOptions {
  x: number
  y: number
  text: string
}
