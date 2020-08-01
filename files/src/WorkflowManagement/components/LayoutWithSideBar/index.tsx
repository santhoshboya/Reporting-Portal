import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import SlimBar from '../Slimbar'

import {
   LayoutContainer,
   SideBarContainer,
   LayoutAndSideBarContainer,
   DrawerIconWrapper,
   SlimBarHeaderWrapper,
   SlimBarFooterWrapper,
   HeaderContainer,
   SlimBarWithLayoutContainer,
   Logo
} from './styledComponents'

interface LayoutWithSideBarProps {
   sideBarView: React.ReactNode
   headerView?: React.ReactNode
}

@observer
class LayoutWithSideBar extends Component<LayoutWithSideBarProps> {
   @observable isSlimBarItemSelected: boolean
   @observable slimBarItemSelectedId: string
   constructor(props) {
      super(props)
      this.isSlimBarItemSelected = false
      this.slimBarItemSelectedId = ''
   }

   openExpandedSlimBar = (value: string) => {
      this.isSlimBarItemSelected = true
      this.slimBarItemSelectedId = value
   }
   closeExpandedSlimBar = () => {
      this.isSlimBarItemSelected = false
   }
   toggleExpandedView = (value: string) => {
      this.slimBarItemSelectedId = value
      this.isSlimBarItemSelected = !this.isSlimBarItemSelected
   }
   renderSlimBarHeaderView = () => (
      <SlimBarHeaderWrapper>
         <Logo
            src={
               'https://cdn.zeplin.io/5efacaf3a9674a242eb8fb11/assets/72c162c1-2163-4890-85be-b30b21c2a0ce.svg'
            }
            alt={'iBHubs Logo'}
         />
         <DrawerIconWrapper onClick={() => this.toggleExpandedView('boards')} />
      </SlimBarHeaderWrapper>
   )
   renderSlimBarFooterView = () => <SlimBarFooterWrapper></SlimBarFooterWrapper>

   render(): React.ReactNode {
      const { children, sideBarView, headerView } = this.props

      return (
         <LayoutAndSideBarContainer>
            <HeaderContainer>{headerView}</HeaderContainer>
            <SlimBarWithLayoutContainer>
               <SideBarContainer>
                  <SlimBar
                     isSlimBarItemSelected={this.isSlimBarItemSelected}
                     slimBarItemSelectedId={this.slimBarItemSelectedId}
                     sideBarView={sideBarView}
                     slimBarHeaderView={this.renderSlimBarHeaderView()}
                     slimBarFooterView={this.renderSlimBarFooterView()}
                  />
               </SideBarContainer>
               <LayoutContainer>{children}</LayoutContainer>
            </SlimBarWithLayoutContainer>
         </LayoutAndSideBarContainer>
      )
   }
}

export default LayoutWithSideBar
