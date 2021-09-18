import React from 'react'
import { components } from 'react-select'

import { DropDownIcon } from './styledComponents'

export default function DropdownIndicator(props) {
   const { selectProps } = props
   const { menuIsOpen } = selectProps

   return (
      components.DropdownIndicator && (
         <components.DropdownIndicator {...props}>
            <DropDownIcon isInverted={menuIsOpen} />
         </components.DropdownIndicator>
      )
   )
}
