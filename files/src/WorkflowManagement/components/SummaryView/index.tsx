import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
// eslint-disable-next-line import/named
import { withTranslation, WithTranslation } from 'react-i18next'

import {
   TextFontS1SubtitleBasic800,
   TextFontC1CaptionBasic800
} from '../../../Common/styleGuide/Typos'
import UpArrow from '../../../Common/icons/UpArrow'

import {
   SummaryViewContainer,
   SummaryText,
   SummaryContainer,
   DetailContainer,
   DetailLabel,
   DetailValue,
   DetailsContainer,
   IconContainer
} from './styledComponents'

//TODO:should add props to show details in summary
interface SummaryViewProps extends WithTranslation {
   isKanbanView?: boolean
}

@observer
class SummaryView extends Component<SummaryViewProps> {
   @observable isOpen: boolean

   static defaultProps = {
      isKanbanView: false
   }

   constructor(props: SummaryViewProps) {
      super(props)
      this.isOpen = false
   }

   onClickSummaryView = (): void => {
      this.isOpen = !this.isOpen
   }

   renderLabel = (label: string): React.ReactNode => {
      const { isKanbanView } = this.props
      if (isKanbanView)
         return <TextFontS1SubtitleBasic800>{label}</TextFontS1SubtitleBasic800>
      return <TextFontC1CaptionBasic800>{label}</TextFontC1CaptionBasic800>
   }

   renderSummaryView = (): React.ReactNode => {
      const { isKanbanView, t } = this.props
      return (
         <SummaryViewContainer
            onClick={this.onClickSummaryView}
            isKanbanView={isKanbanView}
         >
            <SummaryText>
               {t('workflowManagement:summaryView.summary')}
            </SummaryText>
            <IconContainer isOpen={this.isOpen}>
               <UpArrow />
            </IconContainer>
         </SummaryViewContainer>
      )
   }

   renderSummryDetails = (): React.ReactNode => {
      const details = [
         { label: 'Total Tasks', value: '13' },
         { label: 'Total Amount', value: '100000' },
         { label: 'Method', value: 'Online Payment' }
      ]
      const { isKanbanView } = this.props

      return details.map(detail => (
         <DetailContainer key={detail.value} isKanbanView={isKanbanView}>
            <DetailLabel>{this.renderLabel(detail.label)}</DetailLabel>
            <DetailValue>{detail.value}</DetailValue>
         </DetailContainer>
      ))
   }

   renderSummryDetailsView = (): React.ReactNode => {
      const { isKanbanView } = this.props

      return (
         <DetailsContainer isKanbanView={isKanbanView}>
            {this.renderSummryDetails()}
         </DetailsContainer>
      )
   }

   render(): React.ReactNode {
      return (
         <SummaryContainer>
            {this.renderSummaryView()}
            {this.isOpen ? this.renderSummryDetailsView() : null}
         </SummaryContainer>
      )
   }
}

export default withTranslation()(SummaryView)
