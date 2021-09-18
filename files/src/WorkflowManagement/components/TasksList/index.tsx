import React, { Component } from 'react'
import { observer } from 'mobx-react'
// eslint-disable-next-line import/named
import { withTranslation, WithTranslation } from 'react-i18next'
import 'styled-components/macro'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import PaginationNavigation from '../../../Common/components/PaginationNavigation'
import { paginationTypes } from '../../../Common/constants/PaginationTypeConstants'
import LoginIcon from '../../../Common/icons/LogInIcon'
import MenuIcon from '../../../Common/icons/MenuIcon'

import { PAGINATION_TASKS_LIMIT } from '../../constants/ColumnConstants'
import TaskOverviewStore from '../../stores/TaskOverviewStore'

import Task from '../TaskRow'

import {
   TasksListContainer,
   Table,
   TableBody,
   TableHeader,
   TableHeadingContainer,
   TableHeading,
   paginationContainerCSS,
   NoDataViewContainer,
   IconContainer
} from './styledComponents'

interface TasksListProps extends WithTranslation {
   taskFieldsHeadings: Array<string>
   taskStore: TaskOverviewStore
   onClickTask: Function
   containerCSS?: React.CSSProperties
   selectedTabId: string
}

@observer
class TasksList extends Component<TasksListProps> {
   onClickPage = (page: number): void => {
      const { taskStore } = this.props
      taskStore.setCurrentPageNumber(page)
      this.getTasks()
   }
   onClickTask = (id: string): void => {
      const { onClickTask } = this.props
      onClickTask(id)
   }

   renderNoDataView = (): React.ReactNode => (
      <NoDataViewContainer>
         <TableHeading>Tasks are yet to be added to this list</TableHeading>
      </NoDataViewContainer>
   )

   renderTasksList = (): React.ReactNode => {
      const { selectedTabId } = this.props
      const { tasks, currentPage } = this.props.taskStore
      return tasks
         .slice(
            (currentPage - 1) * PAGINATION_TASKS_LIMIT,
            (currentPage - 1) * PAGINATION_TASKS_LIMIT + PAGINATION_TASKS_LIMIT
         )
         .map(task => (
            <Task
               selectedTabId={selectedTabId}
               task={task}
               onClickTask={this.onClickTask}
               onClickAction={this.getTasks}
               key={task.id}
            />
         ))
   }

   renderTableHeadings = (): React.ReactNode => {
      const { taskFieldsHeadings } = this.props
      return taskFieldsHeadings.map(heading => (
         <TableHeadingContainer key={heading}>
            <TableHeading>{heading}</TableHeading>
         </TableHeadingContainer>
      ))
   }

   renderTableHeader = (): React.ReactNode => (
      <>
         {this.renderTableHeadings()}
         <IconContainer>
            <LoginIcon />
         </IconContainer>
         <IconContainer>
            <MenuIcon />
         </IconContainer>
      </>
   )

   renderSuccessView = observer(() => {
      const { containerCSS, taskStore } = this.props
      const { currentPage, totalTasks, tasks } = taskStore
      return (
         <TasksListContainer css={containerCSS}>
            <Table cellSpacing={'0'}>
               <TableHeader>{this.renderTableHeader()}</TableHeader>
               <TableBody>{this.renderTasksList()}</TableBody>
            </Table>
            {tasks.length > 0 ? null : this.renderNoDataView()}
            <PaginationNavigation
               key={taskStore.columnId}
               currentPage={currentPage}
               totalNoOfItems={totalTasks}
               onPagePress={this.onClickPage}
               maxDisplayPagesCount={5}
               itemsPerPage={PAGINATION_TASKS_LIMIT}
               type={paginationTypes.advanced}
               paginationContainerCSS={paginationContainerCSS}
            />
         </TasksListContainer>
      )
   })

   getTasks = (): void => {
      const { taskStore } = this.props
      taskStore.getTasks(true)
   }

   render(): React.ReactNode {
      const { taskStore } = this.props
      const { getTasksAPIStatus, getTasksAPIError } = taskStore
      return (
         <LoadingWrapper
            apiError={getTasksAPIError}
            apiStatus={getTasksAPIStatus}
            onRetry={this.getTasks}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withTranslation()(TasksList)
