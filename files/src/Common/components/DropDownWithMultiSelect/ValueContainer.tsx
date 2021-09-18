import React from 'react'
import { components } from 'react-select'

import { SelectContainer, ValueOptionText } from './styledComponents'
type ValueContainerProps = {
   children: string
   getValue: Function
   selectProps: { maxToShow: number }
}
function ValueContainer(props: ValueContainerProps) {
   const { children, getValue, selectProps } = props
   const maxToShow = selectProps.maxToShow
   const length = getValue().length
   const displayChips = React.Children.toArray(children).slice(0, maxToShow)
   const shouldBadgeShow = length > maxToShow
   const displayLength = length - maxToShow
   return (
      <components.ValueContainer {...props}>
         <SelectContainer>
            <ValueOptionText data-testid='value-container'>
               {displayChips}
               <div>{shouldBadgeShow && `+ ${displayLength}`}</div>
            </ValueOptionText>
         </SelectContainer>
      </components.ValueContainer>
   )
}

export default ValueContainer
