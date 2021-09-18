import React, { Component } from 'react'

import BriefcaseIcon from '../../../Common/icons/BriefcaseIcon'

import { MenuContainer } from './styledComponents'

class SideBarCollapsedView extends Component {
   render() {
      return (
         <MenuContainer data-testid={'sideBarCollapsedView'}>
            <BriefcaseIcon height={'40px'} width={'40px'} />
         </MenuContainer>
      )
   }
}

export default SideBarCollapsedView
