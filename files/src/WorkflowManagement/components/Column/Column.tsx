/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import InfiniteScrollList from '../../../Common/components/InfiniteScrollList'
import Loader from '../../../Common/components/Loader'

import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import ColumnModel from '../../stores/models/ColumnModel'
import TaskOverview from '../TaskOverview'
import { LoaderWrapper } from '../BoardsList/styledComponents'

import {
   Wrapper,
   TasksContainer,
   scrollerStyles,
   ScrollerContainer
} from './styledComponents'
import ActionModal from './ActionsModal'
import ColumnHeader from './ColumnHeader'

interface ColumnProps {
   column: ColumnModel
   shouldHighlight: boolean
   onClickTask: (id: string) => void
}

@observer
class Column extends Component<ColumnProps> {
   @observable isModalOpen: boolean
   @observable draggedTask: TaskOverviewModel | null
   @observable selectedActionId: null | string
   @observable draggedItem: any
   @observable modalRef

   static defaultProps = {
      shouldHighlight: false
   }

   constructor(props) {
      super(props)
      this.isModalOpen = false
      this.draggedTask = null
      this.selectedActionId = null
   }

   changeDragItem = item => {
      if (
         this.selectedActionId &&
         item.task &&
         (!this.draggedItem || item.task.id !== this.draggedItem.task.id)
      ) {
         setTimeout(() => (this.draggedItem = item), 0)
      }
   }

   onDragTask = task => {
      setTimeout(() => {
         this.draggedTask = task
         this.isModalOpen = true
      }, 0)
   }

   closeModal = () => {
      this.isModalOpen = false
      this.selectedActionId = null
      this.draggedItem = null
   }

   onDropTask = (id: string | null) => {
      if (id) {
         this.selectedActionId = id
      } else if (!this.draggedItem) {
         this.closeModal()
      }
   }

   onSubmit = (taskId: string) => {
      const { column } = this.props
      const { tasks } = column.taskStore
      const task = tasks.find(task => task.id === taskId)

      task &&
         task.getTaskActionResponse(
            taskId,
            this.selectedActionId,
            column.id,
            this.closeModal
         )
   }

   renderTasks = (): JSX.Element => {
      const { onClickTask } = this.props
      const { tasks } = this.props.column.taskStore
      return (
         <TasksContainer>
            {tasks.map(task => (
               <TaskOverview
                  onClickTask={onClickTask}
                  key={task.id}
                  task={task}
                  onDrag={this.onDragTask}
                  onDrop={this.onDropTask}
               />
            ))}
         </TasksContainer>
      )
   }

   renderLoader = (): React.ReactNode => (
      <LoaderWrapper>
         <Loader />
      </LoaderWrapper>
   )

   renderColumnDetails = () => {
      const { name, totalTaskCount } = this.props.column
      return <ColumnHeader name={name} totalTaskCount={totalTaskCount} />
   }

   renderInfiniteScrollTasksList = (): React.ReactNode => {
      const {
         hasMoreTasks,
         getTasks,
         tasksLength
      } = this.props.column.taskStore
      const { id } = this.props.column
      return (
         <ScrollerContainer id={id}>
            <InfiniteScrollList
               dataLength={tasksLength}
               next={getTasks}
               hasMore={hasMoreTasks}
               loader={this.renderLoader()}
               scrollableTarget={id}
               style={scrollerStyles}
            >
               {this.renderTasks()}
            </InfiniteScrollList>
         </ScrollerContainer>
      )
   }

   render() {
      const { shouldHighlight } = this.props
      return (
         <Wrapper shouldHighlight={shouldHighlight}>
            {this.renderColumnDetails()}
            {this.renderInfiniteScrollTasksList()}
            <ActionModal
               draggedItem={this.draggedItem}
               changeDragItem={this.changeDragItem}
               onSubmit={this.onSubmit}
               isModalOpen={this.isModalOpen}
               task={this.draggedTask}
               selectedActionId={this.selectedActionId}
               closeModal={this.closeModal}
            />
         </Wrapper>
      )
   }
}

export default Column
