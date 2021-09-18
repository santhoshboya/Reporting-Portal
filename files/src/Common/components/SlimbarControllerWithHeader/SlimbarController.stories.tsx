import React from 'react'

import styled from 'styled-components'
import tw from 'twin.macro'

import HomeIcon from '../../icons/HomeIcon'

import HistoryIcon from '../../icons/HistoryIcon'
import DrawerIcon from '../../icons/DrawerIcon'

import SlimbarControllerWithHeader from '.'

const MainSection = styled.div`
   ${tw`
      flex flex-1
   `}
`

const MainSectionContentContainer = styled.pre`
   ${tw`
      m-0 p-0
   `}
`
const Header = styled.div`
   ${tw`border border-red-500 border-solid`}
`

export default {
   title: 'Slimbar Controller With Header'
}
const headerData = [
   { id: '1', content: HomeIcon },
   { id: '2', content: HistoryIcon }
]
const footerData = [{ id: '3', content: DrawerIcon }]
const RenderSlimbarExpandedView = (activeItemId, isExpanded) => {
   if (isExpanded) {
      switch (activeItemId) {
         case '1':
            return <div>Home</div>
         case '2':
            return <div>History</div>
         default:
            return <div>Home</div>
      }
   }
   return null
}
const HeaderComponent = () => <div>Header</div>

// re-write stores with changed component

const setIsExpanded = () => {},
   isExpanded = true,
   setActiveItem = () => {},
   activeItemId = '1'
// export const SlimbarControllerStories = () => (
//    <>
//       <SlimbarControllerWithHeader
//          {...{ setIsExpanded, isExpanded, setActiveItem, activeItemId }}
//          slimBarExpandedView={RenderSlimbarExpandedView}
//          slimbarCollapsedHeaderData={headerData}
//          slimbarCollapsedFooterData={footerData}
//          renderHeader={() => (
//             <SlimbarControllerWithHeader.header>
//                <HeaderComponent />
//             </SlimbarControllerWithHeader.header>
//          )}
//       >
//          <MainSection>
//             <MainSectionContentContainer>
//                <div>Hello</div>
//             </MainSectionContentContainer>
//          </MainSection>
//       </SlimbarControllerWithHeader>
//    </>
// )
