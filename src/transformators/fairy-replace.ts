import { IRoomContext } from '../rooms/context'
import { findEntities } from '../finders/find-entities'
import { EntityTypes } from '../rooms/types'
import { IHoverText } from '../rooms/hovertext'


export const fairyReplace = (context: IRoomContext) => {
  console.log('replacing the placeholders')

  context.acts.forEach((act) => {
    const placeholders = findEntities(act, x => x.type === EntityTypes.HoverText)

    const fairyPlaceholders = placeholders.filter((x) => {
      if (x.entity.type !== EntityTypes.HoverText) return false
      const text = <IHoverText>x.entity
      
      return text.text === 'fairy'
    })

    fairyPlaceholders.forEach((x) => {
      x.entity.type = 'FairyCage'
    })
  })
}
