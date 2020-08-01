import React from 'react'
import { components } from 'react-select'
import { MenuOption } from './styledComponents'
import MenuOptionCheckBox from './MenuOptionCheckBox'
type OptionProps = {
   children: string
   isSelected: boolean
   selectProps: { onChange: (value: string) => void }
}

function Option(props: OptionProps) {
   const { children, isSelected } = props
   return (
      <components.Option {...props}>
         <MenuOption>
            <MenuOptionCheckBox checked={isSelected} />
            {children}
         </MenuOption>
      </components.Option>
   )
}

export default Option
