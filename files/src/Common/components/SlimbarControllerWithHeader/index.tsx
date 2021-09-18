import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { observable } from 'mobx'
import SlimBar from '../Slimbar'
import {
   SlimBarExpandedViewWrapper,
   CloseButtonWrapper,
   CloseButton
} from '../Slimbar/styledComponents'
import CloseIcon from '../../icons/CloseIcon'
import SlimbarToggleIcon from '../../icons/SlimbarToggleIcon'
import {
   LayoutContainer,
   SideBarContainer,
   LayoutAndSideBarContainer,
   HeaderContainer
} from './styledComponents'

interface SlimbarControllerProps {
   children: any
   slimBarExpandedView: any
   slimbarCollapsedHeaderData: Array<{ id: string; content: any }>
   slimbarCollapsedFooterData: Array<{ id: string; content: any }>
   renderHeader?: any
   isExpanded: boolean
   activeSlimbarCollapsedItemId: string
   setActiveItem: (id: string) => void
   setIsExpanded: () => void
}
const Header = (props: any) => (
   <HeaderContainer className={props.className}>
      {props.children}
   </HeaderContainer>
)

@observer
class SlimbarControllerWithHeader extends Component<SlimbarControllerProps> {
   @observable toggleIconFillColor!: string

   static header = Header

   renderSlimbarExpandedView = () => {
      const {
         slimBarExpandedView,
         isExpanded,
         activeSlimbarCollapsedItemId
      } = this.props
      return isExpanded
         ? slimBarExpandedView(activeSlimbarCollapsedItemId, isExpanded)
         : null
   }
   changeFillColorToWhite = () => {
      this.toggleIconFillColor = 'white' //TODO:use tailwind or import Colors
   }
   changeFillColorToBlue = () => {
      this.toggleIconFillColor = '#616E7C'
   }
   render(): React.ReactNode {
      const {
         children,
         slimBarExpandedView,
         slimbarCollapsedHeaderData,
         slimbarCollapsedFooterData,
         renderHeader: RenderHeader,
         isExpanded,
         activeSlimbarCollapsedItemId,
         setActiveItem,
         setIsExpanded
      } = this.props

      return (
         <LayoutAndSideBarContainer>
            <RenderHeader />
            <SideBarContainer>
               <SlimBar
                  slimBarExpandedView={slimBarExpandedView}
                  slimbarCollapsedHeaderData={slimbarCollapsedHeaderData}
                  slimbarCollapsedFooterData={slimbarCollapsedFooterData}
                  isExpanded={isExpanded}
                  setActiveItem={setActiveItem}
                  activeSlimbarCollapsedItemId={activeSlimbarCollapsedItemId}
                  setIsExpanded={setIsExpanded}
               />
            </SideBarContainer>

            <LayoutContainer isHovered={isExpanded}>
               <SlimBarExpandedViewWrapper isHovered={isExpanded}>
                  <CloseButtonWrapper
                     onClick={setIsExpanded}
                     onMouseEnter={this.changeFillColorToWhite}
                     onMouseLeave={this.changeFillColorToBlue}
                  >
                     <SlimbarToggleIcon
                        filledColor={this.toggleIconFillColor}
                     />
                  </CloseButtonWrapper>

                  {this.renderSlimbarExpandedView()}
               </SlimBarExpandedViewWrapper>
               {children}
            </LayoutContainer>
         </LayoutAndSideBarContainer>
      )
   }
}

export default SlimbarControllerWithHeader
