import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'
// eslint-disable-next-line import/named
import { withTranslation, WithTranslation } from 'react-i18next'
import 'styled-components/macro'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import TabBar from '../../../Common/components/TabBar'
import { tabBarTypes } from '../../../Common/constants/TabBarConstants'

import ColumnsStore from '../../stores/ColumnsStore'
import ColumnModel from '../../stores/models/ColumnModel'
import TaskOverviewStore from '../../stores/TaskOverviewStore'

import SummaryView from '../SummaryView'
import TasksList from '../TasksList'

import {
   ListViewContainer,
   NoDataViewContainer,
   NoDataText,
   tabCSS,
   selectedTabCSS
} from './styledComponents'

interface ListViewProps extends WithTranslation {
   columnsStore: ColumnsStore
   onClickTask: Function
   containerCSS?: React.CSSProperties
   selectedBoardId: string
}

@observer
class ListView extends Component<ListViewProps> {
   @observable selectedTabId!: string
   @observable taskStore!: TaskOverviewStore

   @computed get selectedTabIndex(): number {
      return this.getTabsList().findIndex(
         tab => tab.value === this.selectedTabId
      )
   }

   componentDidMount(): void {
      this.getColumns()
   }

   getColumns = (): void => {
      const { selectedBoardId, columnsStore } = this.props
      const { setSelectedBoard, getColumns } = columnsStore
      setSelectedBoard(selectedBoardId)
      getColumns(this.init)
   }

   onClickTask = (id: string): void => {
      const { onClickTask } = this.props
      onClickTask(id)
   }

   getTasksListHeadings = () => {
      const headingsList: Array<string> = ['Task Id']
      this.taskStore.tasks[0].fields.map(field => headingsList.push(field.name))
      return headingsList
   }

   onClickTab = (id: string): void => {
      const { columnsStore } = this.props
      const { columns } = columnsStore
      this.selectedTabId = id
      this.taskStore.setCurrentPageNumber(1)
      const column = columns.find(column => column.id === id) as ColumnModel
      const { taskStore } = column
      this.taskStore = taskStore
   }

   getTabsList = (): Array<{ label: string; value: string }> => {
      const { columnsStore } = this.props
      const { columns } = columnsStore
      return columns.map(column => ({
         label: column.name,
         value: column.id
      }))
   }

   init = (): void => {
      const { columnsStore } = this.props
      const { columns } = columnsStore
      const { id, taskStore } = columns[0]
      taskStore.sliceInitialTasksToPaginationLimit()
      this.selectedTabId = id
      this.taskStore = taskStore
   }

   renderNoDataView = () => (
      <NoDataViewContainer>
         <NoDataText>There are no tasks on this board yet</NoDataText>
      </NoDataViewContainer>
   )

   renderSuccessView = observer(() => {
      const { containerCSS } = this.props

      return this.taskStore ? (
         <ListViewContainer css={containerCSS}>
            <TabBar
               tabs={this.getTabsList()}
               selectedTab={this.selectedTabId}
               onClickTab={this.onClickTab}
               type={tabBarTypes.withoutIcon}
               tabItemCss={tabCSS}
               selectedTabCss={selectedTabCSS}
            />
            <SummaryView />
            <TasksList
               selectedTabId={this.selectedTabId}
               taskStore={this.taskStore}
               taskFieldsHeadings={this.getTasksListHeadings()}
               onClickTask={this.onClickTask}
            />
         </ListViewContainer>
      ) : null
   })

   render(): React.ReactNode {
      const { columnsStore } = this.props
      const { getColumnsAPIError, getColumnsAPIStatus } = columnsStore

      return (
         <LoadingWrapper
            apiStatus={getColumnsAPIStatus}
            apiError={getColumnsAPIError}
            onRetry={this.getColumns}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withTranslation()(ListView)
