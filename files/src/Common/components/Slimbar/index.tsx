import React from 'react'
import { observer } from 'mobx-react'

import IBHubsLogo from '../../../Discussions/components/IBHubsLogo'

import { SlimBarHeader } from '../SlimbarControllerWithHeader/styledComponents'
import { IconContainer } from '../../../WorkflowManagement/components/BoardsListController/styledComponents'
import {
   SlimBarContainer,
   SlimBarSection,
   SlimBarSubSection,
   SlimBarSubSections,
   IconWrapper
} from './styledComponents'

interface SlimBarProps {
   slimBarExpandedView: any
   slimbarCollapsedHeaderData
   slimbarCollapsedFooterData
   isExpanded: boolean
   setActiveItem
   activeSlimbarCollapsedItemId
   setIsExpanded
}

@observer
class SlimBar extends React.Component<SlimBarProps> {
   renderSlimBarFooterSectionOptions = () => {
      const {
         slimbarCollapsedFooterData,
         setActiveItem,
         activeSlimbarCollapsedItemId
      } = this.props
      return slimbarCollapsedFooterData.map(EachIcon => (
         <IconWrapper
            onClick={() => setActiveItem(EachIcon.id)}
            isActive={activeSlimbarCollapsedItemId === EachIcon.id}
            key={EachIcon.id}
         >
            <EachIcon.content />
         </IconWrapper>
      ))
   }
   renderContent = (iconId, EachIcon) => {
      const { activeSlimbarCollapsedItemId } = this.props
      if (activeSlimbarCollapsedItemId === iconId)
         return <EachIcon.contentOnActive />
      return <EachIcon.content />
   }
   renderSlimBarHeaderSectionOptions = () => {
      const {
         slimbarCollapsedHeaderData,
         setActiveItem,
         activeSlimbarCollapsedItemId,
         setIsExpanded
      } = this.props

      return slimbarCollapsedHeaderData.map(EachIcon => (
         <IconWrapper
            onClick={() => setActiveItem(EachIcon.id)}
            isActive={activeSlimbarCollapsedItemId === EachIcon.id}
            key={EachIcon.id}
         >
            {this.renderContent(EachIcon.id, EachIcon)}
         </IconWrapper>
      ))
   }
   renderSlimbarExpandedView = () => {
      const {
         isExpanded,
         slimBarExpandedView,
         activeSlimbarCollapsedItemId
      } = this.props
      return isExpanded
         ? slimBarExpandedView(activeSlimbarCollapsedItemId, isExpanded)
         : null
   }

   render() {
      return (
         <>
            <SlimBarContainer>
               <SlimBarSection>
                  <SlimBarHeader>
                     <IBHubsLogo width={60} height={60} />
                  </SlimBarHeader>
                  <SlimBarSubSections>
                     <SlimBarSubSection>
                        {this.renderSlimBarHeaderSectionOptions()}
                     </SlimBarSubSection>
                     <SlimBarSubSection>
                        {this.renderSlimBarFooterSectionOptions()}
                     </SlimBarSubSection>
                  </SlimBarSubSections>
               </SlimBarSection>
            </SlimBarContainer>
         </>
      )
   }
}
export default SlimBar
