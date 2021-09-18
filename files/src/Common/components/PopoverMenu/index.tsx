import React, { Component } from 'react'
import { Popover, Trigger, Target } from '@accessible/popover'
import onClickOutside from 'react-onclickoutside'

import MenuIcon from '../../icons/MenuIcon'
import i18n from '../../i18n'
import {
   PopoverContainer,
   TriggerContainer,
   TargetContainer
} from './styledComponents'
import { PopoverMenuProps } from './types'

class PopoverMenu extends Component<PopoverMenuProps> {
   static defaultProps = {
      placement: i18n.t('common:popOverMenu.bottomRight'),
      on: i18n.t('common:popOverMenu.click'),
      renderPopoverTrigger: <MenuIcon />
   }

   state = {
      open: false
   }

   handleClickOutside = () => {
      this.setState({ open: false })
   }

   togglePopoverMenu = (): void => {
      this.setState({
         open: !this.state.open
      })
   }

   render() {
      const {
         placement,
         on,
         renderPopoverContent,
         renderPopoverTrigger
      } = this.props

      return (
         <Popover
            repositionOnScroll
            repositionOnResize
            onChange={this.togglePopoverMenu}
            open={this.state.open}
         >
            <Trigger on={on}>
               <PopoverContainer>
                  <TriggerContainer>{renderPopoverTrigger}</TriggerContainer>
                  <Target placement={placement}>
                     <TargetContainer>{renderPopoverContent}</TargetContainer>
                  </Target>
               </PopoverContainer>
            </Trigger>
         </Popover>
      )
   }
}

export default onClickOutside(PopoverMenu)
