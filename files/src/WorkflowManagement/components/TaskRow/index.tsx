import React, { Component } from 'react'
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'
// eslint-disable-next-line import/named
import { withTranslation, WithTranslation } from 'react-i18next'
import { API_FETCHING } from '@ib/api-constants'

import Button from '../../../Common/components/Button'
import MenuIcon from '../../../Common/icons/MenuIcon'
import CommentIcon from '../../../Common/icons/CommentIcon'
import Loader from '../../../Common/components/Loader'

import { fieldTypes } from '../../constants/ColumnConstants'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'

import { variants, Colors } from '../../../Common/components/Button/constants'
import { actionsType } from '../../constants/TaskActionConstants'

import {
   TaskId,
   TaskIdContainer,
   TaskRow,
   FieldValue,
   StyledImage,
   StyledTableData,
   Wrapper,
   TaskWrapper,
   ActionsWrapper,
   ActionName,
   IconWrapper,
   ActionButton,
   LoaderWrapper
} from './styledComponents'

const { sizes } = Button

interface TaskProps extends WithTranslation {
   task: TaskOverviewModel
   onClickTask: Function
   onClickAction: (taskId: string, actionId: string) => void
   selectedTabId: string
}

@observer
class Task extends Component<TaskProps> {
   @observable isTaskHovered: boolean

   constructor(props) {
      super(props)
      this.isTaskHovered = false
   }

   setIsTaskHovered = boolean => {
      this.isTaskHovered = boolean
   }

   onClickTask = (): void => {
      const { onClickTask, task } = this.props
      const { id, getTaskActionsAPIStatus } = task
      if (getTaskActionsAPIStatus !== API_FETCHING) onClickTask(id)
   }

   onClickAction = actionId => {
      const { task, onClickAction, selectedTabId } = this.props
      const { id } = task
      task.getTaskActionResponse(id, actionId, selectedTabId, onClickAction)
   }

   getButtonVariant = (actionType: string) => {
      actionType = actionType.toUpperCase()
      if (actionType === actionsType.delete) return Colors.warning500Default
      else if (actionType === actionsType.confirm)
         return Colors.success500Default
      return variants.primary
   }

   getApiStatus = (id: string) => {
      const { getTaskActionsAPIStatus, selectedActionId } = this.props.task
      if (selectedActionId === id) {
         return getTaskActionsAPIStatus
      }
   }

   isDisabled = (id: string) => {
      const { selectedActionId } = this.props.task
      if (selectedActionId && selectedActionId !== id) {
         return true
      }
      return false
   }

   renderLoader = (): React.ReactNode => (
      <LoaderWrapper>
         <Loader type={'ThreeDots'} color={Colors.white} />
      </LoaderWrapper>
   )

   renderActions = (): React.ReactNode => {
      const { actions } = this.props.task
      return this.isTaskHovered ? (
         <ActionsWrapper>
            {actions.map(action => {
               const onClickAction = e => {
                  this.onClickAction(action.id)
                  e.stopPropagation()
               }
               return (
                  <ActionButton
                     disabled={this.isDisabled(action.id)}
                     apiStatus={this.getApiStatus(action.id)}
                     text={action.name}
                     onClick={onClickAction}
                     color={this.getButtonVariant(action.name)}
                     key={action.id}
                     size={sizes.tiny}
                     textTypo={ActionName}
                     renderLoader={this.renderLoader}
                  ></ActionButton>
               )
            })}
         </ActionsWrapper>
      ) : null
   }

   renderHoveredFields = (): React.ReactNode => (
      <Wrapper>
         {this.isTaskHovered ? (
            <>
               <IconWrapper>
                  <CommentIcon fill={'grey'} />
               </IconWrapper>
               <IconWrapper>
                  <MenuIcon />
               </IconWrapper>
            </>
         ) : null}
      </Wrapper>
   )

   renderTaskId = (): React.ReactNode => {
      const { id } = this.props.task
      return (
         <StyledTableData>
            <TaskIdContainer>
               <TaskId isHovered={this.isTaskHovered}>{id}</TaskId>
            </TaskIdContainer>
         </StyledTableData>
      )
   }

   renderFields = (): React.ReactNode => {
      const { fields } = this.props.task
      return fields.map(field => {
         if (field.fieldType === fieldTypes.image) {
            return (
               <StyledTableData key={field.id} isHovered={this.isTaskHovered}>
                  <StyledImage src={field.value} />
               </StyledTableData>
            )
         }
         return (
            <StyledTableData key={field.id} isHovered={this.isTaskHovered}>
               <FieldValue isHovered={this.isTaskHovered}>
                  {field.value}
               </FieldValue>
            </StyledTableData>
         )
      })
   }

   render(): React.ReactNode {
      return (
         <TaskWrapper
            isHovered={this.isTaskHovered}
            onClick={this.onClickTask}
            data-testid={'task'}
            onMouseEnter={() => this.setIsTaskHovered(true)}
            onMouseLeave={() => this.setIsTaskHovered(false)}
         >
            <TaskRow>
               {this.renderTaskId()}
               {this.renderFields()}
               {this.renderHoveredFields()}
            </TaskRow>
            {this.renderActions()}
         </TaskWrapper>
      )
   }
}

export default withTranslation()(Task)
