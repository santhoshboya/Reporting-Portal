import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { observable, reaction } from 'mobx'
import { withTranslation } from 'react-i18next'
import { API_FETCHING, API_FAILED } from '@ib/api-constants'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import withTaskTemplates from '../../../Common/hocs/withTaskTemplates'
import DropDown from '../../../Common/components/DropDown'
import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import { getFormattedAPIErrorDescription } from '../../../Common/utils/APIErrorUtils'
import { toastTypes } from '../../../Common/constants/ToastTypes'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from '../../stores/TaskStore'
import Task from '../../components/Task'
import { WithTranslationProps } from '../../stores/types'
import {
   StageSelector,
   StageActions,
   ActionButton,
   UiWrapper,
   StageActionsWrapper
} from './styledComponents'

interface GetTaskRouteProps extends WithTranslationProps {
   taskStore: TaskStore
   taskTemplateStore: TaskTemplateStore
}

@observer
class UpdateTaskComponent extends Component<GetTaskRouteProps> {
   @observable task: any
   @observable taskTemplate
   taskRef: React.RefObject<Task> = React.createRef()

   constructor(props) {
      super(props)
      this.doNetworkCalls()
   }

   async doNetworkCalls() {
      this.task = await this.getTaskStore().getTask()
      this.taskTemplate = this.getTaskTemplateStore().getTaskTemplate(
         this.task.templateId
      )
   }

   getTaskTemplateStore = () => this.props.taskTemplateStore

   getTaskStore = () => this.props.taskStore

   getTaskStagesNames = () => {
      if (this.task) {
         const { stages } = this.task
         const stageName: Array<any> = []
         stages.forEach(stage =>
            stageName.push({
               label: stage.stageDisplayName,
               value: stage.stageId
            })
         )
         return stageName
      }
   }

   onChangeTaskStage = (id: string) => {
      if (this.task) this.task.onChangeStageId(id)
   }

   getStageName = stageId => this.task?.getStageName(stageId)

   updateTask = event => {
      this.task.onChangeActionId(event.target.id)
      this.taskRef.current?.validateFields()
      const isValid = this.taskRef.current?.isAllGOFFieldsValid()
      if (isValid) {
         const requestObject: any = this.taskRef.current?.getRequestObject()
         const taskId = this.getTaskStore().selectedTaskId
         if (requestObject) {
            requestObject.action_id = this.task.selectedActionId
            requestObject.task_id = taskId
         }
         this.getTaskStore().UpdateSelectedTask(requestObject)
      }
   }

   onFailureUpdateTask = reaction(
      () => {
         const { taskAPIStatus } = this.task
         return taskAPIStatus === API_FAILED
      },
      status => {
         const { taskAPIError } = this.task
         if (status)
            showToast({
               type: toastTypes.danger,
               message: getFormattedAPIErrorDescription(taskAPIError),
               title: ''
            })
      }
   )

   renderStageActions = () => {
      if (this.task) {
         const { stageActions } = this.task
         return (
            <StageActions>
               {stageActions.map(action => {
                  const { actionId, buttontext, buttonColor } = action
                  const otherProps = {
                     color: buttonColor
                  }
                  return (
                     <ActionButton
                        id={actionId}
                        key={buttontext}
                        text={buttontext}
                        onClick={this.updateTask}
                        {...otherProps}
                     />
                  )
               })}
            </StageActions>
         )
      }
   }

   renderSuccessUI = observer(() => {
      const { t } = this.props
      return this.taskTemplate ? (
         <Fragment>
            <UiWrapper>
               <StageSelector>
                  <DropDown
                     labelText={t(
                        'workflowManagement:routes.getTaskRoute.labelText'
                     )}
                     placeholder={t(
                        'workflowManagement:routes.getTaskRoute.placeholder'
                     )}
                     options={this.getTaskStagesNames()}
                     onChange={this.onChangeTaskStage}
                     value={{
                        label: this.getStageName(this.task.selectedStageId),
                        value: this.task.selectedStageId
                     }}
                  />
               </StageSelector>
            </UiWrapper>
            <UiWrapper>{this.renderStageActions()}</UiWrapper>
            <Task
               ref={this.taskRef}
               taskDetails={this.task}
               taskTemplate={this.taskTemplate}
            />
         </Fragment>
      ) : null
   })

   render() {
      const apiStatus =
         this.task && this.taskTemplate ? this.task.taskAPIStatus : API_FETCHING
      const apiError = this.task ? this.task.taskAPIError : null
      const retry = this.task ? this.task.getTaskDetails : () => {}
      return (
         <LoadingWrapper
            apiStatus={apiStatus}
            apiError={apiError}
            onRetry={retry}
            renderSuccessView={this.renderSuccessUI}
         />
      )
   }
}
export default withTranslation()(withTaskTemplates(UpdateTaskComponent))
