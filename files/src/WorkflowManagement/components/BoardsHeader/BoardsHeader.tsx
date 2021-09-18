import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'

import PlusIcon from '../../../Common/icons/PlusIcon'
import WorkflowUiStore from '../../stores/WorkflowUiStore'

import {
   BoardsHeaderContainer,
   HeaderLeftPanel,
   HeaderRightPanel,
   ButtonText,
   ButtonWrapper,
   ProjectLogo,
   ProjectTreeContainer,
   ProjectName,
   ProjectNameContainer,
   ArrowLeftIconWrapper,
   BoardsDropDown,
   dropDownCSS,
   containerCss,
   customStyles
} from './styledComponents'

interface BoardType {
   label: string
   value: string
}

interface InjectedProps extends BoardsHeaderProps {
   workflowUiStore: WorkflowUiStore
}

export interface BoardsHeaderProps extends WithTranslation {
   shouldShowBoardsDropDown?: boolean
   selectedBoard?: BoardType
   shouldEnableNotification?: boolean
   projectName?: string
   boardList: Array<BoardType>
   setSelectedBoard: (value: string) => void
}

@inject('workflowUiStore')
@observer
class BoardsHeader extends Component<BoardsHeaderProps> {
   static defaultProps = {
      shouldShowBoardsDropDown: false,
      shouldEnableNotification: false,
      projectName: ''
   }

   getInjectedProps = () => this.props as InjectedProps

   getWorkflowUiStore = () => this.getInjectedProps().workflowUiStore

   onClickBoard = value => {
      const { setSelectedBoard } = this.props
      setSelectedBoard(value)
   }

   createNewTask = () => {
      const { setCreateTaskModalOpen } = this.getWorkflowUiStore()
      setCreateTaskModalOpen()
   }

   renderHeaderLeftPanel = () => {
      const {
         projectName,
         selectedBoard,
         shouldShowBoardsDropDown,
         boardList
      } = this.props

      return (
         <HeaderLeftPanel>
            <ProjectTreeContainer>
               <ProjectLogo />
               <ProjectNameContainer>
                  {/* //TODO: Need to change Typo TextFontS1SubtitleBasic800*/}
                  <ProjectName>{projectName}</ProjectName>
                  {shouldShowBoardsDropDown && (
                     <ArrowLeftIconWrapper width={24} height={24} />
                  )}
               </ProjectNameContainer>
               {shouldShowBoardsDropDown && (
                  <BoardsDropDown
                     options={boardList}
                     isMulti={false}
                     onChange={this.onClickBoard}
                     value={selectedBoard}
                     labelText={''}
                     data-testid={'dropDown'}
                     dropDownCss={dropDownCSS}
                     containerCss={containerCss}
                     styles={customStyles}
                  />
               )}
            </ProjectTreeContainer>
         </HeaderLeftPanel>
      )
   }

   renderHeaderRightPanel = () => {
      const { t } = this.props

      return (
         <HeaderRightPanel>
            <ButtonWrapper onClick={this.createNewTask}>
               <PlusIcon />
               <ButtonText>
                  {t('workflowManagement:boardsList.header.createNew')}
               </ButtonText>
            </ButtonWrapper>
         </HeaderRightPanel>
      )
   }

   render() {
      return (
         <BoardsHeaderContainer>
            {this.renderHeaderLeftPanel()}
            {this.renderHeaderRightPanel()}
         </BoardsHeaderContainer>
      )
   }
}

export default withTranslation()(BoardsHeader)
