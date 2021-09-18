import React from 'react'
import CheckBoxSelectedDisabledIcon from '../../icons/CheckBoxSelectedDisabledIcon'
import BaseCheckBoxSelectedIcon from '../../icons/BaseCheckBoxSelectedIcon'
import CheckBoxDisabled from '../../icons/CheckBoxDisabled'
import BaseCheckBoxNormalIcon from '../../icons/BaseCheckBoxNormalIcon'
import './styles.css'
interface MenuOptionCheckBoxProps {
   checked: boolean
   disabled: boolean
}
class MenuOptionCheckBox extends React.Component<MenuOptionCheckBoxProps> {
   static defaultProps = {
      checked: false,
      disabled: false
   }
   render() {
      const { checked, disabled } = this.props
      if (checked) {
         if (disabled) {
            return (
               <div className='checkBoxImage'>
                  <CheckBoxSelectedDisabledIcon />
               </div>
            )
         }
         return (
            <div className='checkBoxImage'>
               <BaseCheckBoxSelectedIcon />
            </div>
         )
      }
      if (disabled) {
         return (
            <div className='checkBoxImage'>
               <CheckBoxDisabled />
            </div>
         )
      }
      return (
         <div className='checkBoxImage'>
            <BaseCheckBoxNormalIcon />
         </div>
      )
   }
}
export default MenuOptionCheckBox
