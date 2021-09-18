import React, { ReactNode } from 'react'

import {
   SlimBarContainer,
   SlimBarSection,
   SideBarViewWrapper
} from './styledComponents'

interface SlimBarProps {
   isSlimBarItemSelected: boolean
   slimBarItemSelectedId: string
   sideBarView: React.ReactNode
   slimBarHeaderView: React.ReactNode
   slimBarFooterView: React.ReactNode
}

const SlimBar = (props: SlimBarProps): JSX.Element => {
   const {
      isSlimBarItemSelected,
      sideBarView,
      slimBarHeaderView,
      slimBarFooterView
   } = props

   return (
      <SlimBarContainer>
         <SlimBarSection>
            {slimBarHeaderView}
            {slimBarFooterView}
         </SlimBarSection>
         <SideBarViewWrapper isSlimBarItemSelected={isSlimBarItemSelected}>
            {sideBarView}
         </SideBarViewWrapper>
      </SlimBarContainer>
   )
}

export default SlimBar
