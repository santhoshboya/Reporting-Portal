import React, { ReactNode } from 'react'

import ArrowLeftIcon from '../../../Common/icons/ArrowLeftIcon'

import {
   SideBarContainer,
   SideBarSection,
   SideBarToggleIconContainer
} from './styledComponents'

interface SideBarProps {
   collapsedHeaderView: React.ReactNode
   expandedHeaderView: React.ReactNode
   collapsedFooterView: React.ReactNode
   expandedFooterView: React.ReactNode
   isCollapsed: boolean
   onClickSideBarToggleButton: () => void
}

const SideBar = (props: SideBarProps): JSX.Element => {
   const { isCollapsed, onClickSideBarToggleButton } = props

   const renderHeaderView = (): ReactNode => {
      const { collapsedHeaderView, expandedHeaderView } = props
      return isCollapsed ? collapsedHeaderView : expandedHeaderView
   }

   const renderFooterView = (): ReactNode => {
      const { collapsedFooterView, expandedFooterView } = props
      return isCollapsed ? collapsedFooterView : expandedFooterView
   }

   const renderIcon = (): ReactNode =>
      isCollapsed ? (
         <ArrowLeftIcon width={15} height={15} />
      ) : (
         <ArrowLeftIcon width={15} height={15} />
      )

   return (
      // TODO: Need to update styles for glitching
      <SideBarContainer isCollapsed={isCollapsed}>
         <SideBarSection>{renderHeaderView()}</SideBarSection>
         <SideBarSection>{renderFooterView()}</SideBarSection>
         <SideBarToggleIconContainer
            data-testid='SIDEBAR'
            onClick={onClickSideBarToggleButton}
         >
            {renderIcon()}
         </SideBarToggleIconContainer>
      </SideBarContainer>
   )
}

export default SideBar
