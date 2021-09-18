import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import * as qs from 'query-string'
import { observable, computed } from 'mobx'
import { RouteComponentProps } from 'react-router-dom'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import KanbanViewIcon from '../../../Common/icons/KanbanViewIcon'
import ListViewIcon from '../../../Common/icons/ListViewIcon'
import WithSlimbarControllerRoute, {
   routeInfo
} from '../../../hocs/withSlimbarControllerRoute/withSlimbarControllerRoute'

import { loadingWrapperStyles } from '../../components/Columns/styledComponents'

import Columns from '../../components/Columns'
import ListView from '../../components/ListView'
import BoardsStore from '../../stores/BoardsStore'
import ColumnsStore from '../../stores/ColumnsStore'
import { getSelectedBoard } from '../../utils/BoardsUtils'

import WorkflowUiStore from '../../stores/WorkflowUiStore'
import TaskStore from '../../stores/TaskStore'
import { viewConstants } from './constants'
import {
   IconsContainer,
   IconContainer,
   listViewContainerCSS,
   ViewContainer
} from './styledComponents'

interface SelectedBoardType {
   selectedBoardId: string
}

interface InjectedProps extends RouteComponentProps<SelectedBoardType> {
   boardsStore: BoardsStore
   columnsStore: ColumnsStore
   taskStore: TaskStore
   workflowUiStore: WorkflowUiStore
}

@inject('workflowUiStore', 'taskStore', 'boardsStore', 'columnsStore')
@observer
class BoardsRoute extends Component<RouteComponentProps<SelectedBoardType>> {
   @observable hasMoreBoards: boolean
   @observable isCollapsed: boolean
   @observable selectedView!: string

   constructor(props) {
      super(props)
      this.isCollapsed = false
      this.hasMoreBoards = true
      this.selectedView = viewConstants.kanbanView
   }

   get injectedProps() {
      return this.props as InjectedProps
   }
   getWorkflowUiStore = () => this.injectedProps.workflowUiStore

   onColumnsMount = () => {
      const { getColumns, setSelectedBoard } = this.injectedProps.columnsStore
      const { boardsList } = this.injectedProps.boardsStore
      const { id } = boardsList[0]
      const { location } = this.props

      setSelectedBoard(getSelectedBoard(location, id))
      getColumns()
   }

   onClickTask = (id: string) => {
      this.injectedProps.taskStore.onChangeSelectedTaskId(id)
      this.injectedProps.workflowUiStore.setCreateTaskModalOpen()
   }

   onClickIcon = (viewType: string): void => {
      this.selectedView = viewType
   }

   renderViewBasedOnSelectedLayout = (): React.ReactNode => {
      const { columnsStore } = this.injectedProps
      const {
         columns,
         getColumnsAPIError,
         getColumnsAPIStatus,
         selectedBoardId,
         highlightedColumnsList
      } = columnsStore
      if (this.isKanbanViewSelected) {
         return (
            <Columns
               onClickTask={this.onClickTask}
               selectedBoardId={selectedBoardId}
               columns={columns}
               onColumnsMount={this.onColumnsMount}
               getColumnsAPIStatus={getColumnsAPIStatus}
               getColumnsAPIError={getColumnsAPIError}
               highlightedColumnsList={highlightedColumnsList}
            />
         )
      } else if (this.isListViewSelected) {
         return (
            <ListView
               columnsStore={columnsStore}
               selectedBoardId={selectedBoardId}
               onClickTask={this.onClickTask}
               containerCSS={listViewContainerCSS}
            />
         )
      }
   }

   @computed get isKanbanViewSelected(): boolean {
      return this.selectedView === viewConstants.kanbanView
   }

   @computed get isListViewSelected(): boolean {
      return this.selectedView === viewConstants.listView
   }

   renderViewIcons = (): React.ReactNode => (
      <IconsContainer>
         <IconContainer
            onClick={(): void => this.onClickIcon(viewConstants.kanbanView)}
            isSelected={this.isKanbanViewSelected}
         >
            <KanbanViewIcon isSelected={this.isKanbanViewSelected} />
         </IconContainer>
         <IconContainer
            onClick={(): void => this.onClickIcon(viewConstants.listView)}
            isSelected={this.isListViewSelected}
         >
            <ListViewIcon isSelected={this.isListViewSelected} />
         </IconContainer>
      </IconsContainer>
   )

   renderBoardsAndColumns = () => (
      <ViewContainer>
         {this.renderViewIcons()}
         {this.renderViewBasedOnSelectedLayout()}
      </ViewContainer>
   )

   renderLoadingWrapperOrBoards = () => {
      const {
         boardsApiStatus,
         boardsApiError,
         boardsCount
      } = this.injectedProps.boardsStore
      if (boardsCount === 0) {
         return (
            <LoadingWrapper
               apiStatus={boardsApiStatus}
               apiError={boardsApiError}
               renderSuccessView={this.renderBoardsAndColumns}
               containerStyle={loadingWrapperStyles}
            />
         )
      }
      return this.renderBoardsAndColumns()
   }

   render() {
      return <>{this.renderLoadingWrapperOrBoards()}</>
   }
}

export default WithSlimbarControllerRoute(BoardsRoute, {
   defaultActiveSlimbarCollapsedId: routeInfo.board,
   defaultIsExpanded: true
})
