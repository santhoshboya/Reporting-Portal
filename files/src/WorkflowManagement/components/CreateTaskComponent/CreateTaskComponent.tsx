import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, reaction } from 'mobx'
import { withTranslation } from 'react-i18next'
import { API_FAILED } from '@ib/api-constants'

import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import { getFormattedAPIErrorDescription } from '../../../Common/utils/APIErrorUtils'
import withTaskTemplates from '../../../Common/hocs/withTaskTemplates'
import DropDown from '../../../Common/components/DropDown'
import { toastTypes } from '../../../Common/constants/ToastTypes'
import Task from '../../components/Task'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from '../../stores/TaskStore'
import { WithTranslationProps } from '../../stores/types'

import {
   TemplateSelector,
   TaskTemplateWrapper,
   TaskActions,
   TaskActionsFooter,
   ActionsWrapper,
   CreateRouteWrapper,
   ActionButton
} from './styledComponents'

interface CreateTaskComponentProps extends WithTranslationProps {
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@observer
class CreateTaskComponent extends Component<CreateTaskComponentProps> {
   @observable taskDetails
   @observable taskTemplate
   taskRef: React.RefObject<Task> = React.createRef()
   componentDidMount() {
      this.taskTemplate = this.getTaskTemplateStore().getTaskTemplate('FIN_PR')
      this.getTaskStore().createNewTask(this.taskTemplate)
      this.taskDetails = this.getTaskStore().temporaryTask
   }

   componentWillUnmount() {
      this.onFailureCreateTask()
   }

   getTaskTemplateStore = () => this.props.taskTemplateStore

   getTaskStore = () => this.props.taskStore

   getTaskTemplateNames = () => {
      const taskTemplates = Array.from(
         this.getTaskTemplateStore().taskTemplates.values()
      )
      return taskTemplates.map(each => ({
         value: each.templateId,
         label: each.templateName
      }))
   }

   onChangeTaskTemplates = id => {
      this.taskTemplate = this.getTaskTemplateStore().getTaskTemplate(id)
      this.getTaskStore().temporaryTask.onChangeTemplate(this.taskTemplate)
      this.taskDetails = this.getTaskStore().temporaryTask
   }

   getTaskTemplateName = id =>
      this.getTaskTemplateStore().taskTemplates.get(id)?.templateName

   taskValidate = event => {
      this.taskDetails.onChangeActionId(event.target.id)
      this.taskRef.current?.validateFields()

      if (this.taskRef.current?.isAllGOFFieldsValid()) {
         this.createTask()
      }
   }

   createTask = () => {
      const { submitCreatedNewTask } = this.getTaskStore()
      const requestObject: any = this.taskRef.current?.getRequestObject()
      if (requestObject) {
         requestObject.action_id = this.taskDetails.selectedActionId
         requestObject.task_template_id = this.taskTemplate.templateId
      }
      console.log('CreateTask Request Object', requestObject)
      submitCreatedNewTask(requestObject)
   }

   onFailureCreateTask = reaction(
      () => {
         const { getCreateTaskAPIStatus } = this.getTaskStore()
         return getCreateTaskAPIStatus === API_FAILED
      },
      status => {
         const { getCreateTaskAPIError } = this.getTaskStore()
         if (status)
            showToast({
               type: toastTypes.danger,
               message: getFormattedAPIErrorDescription(getCreateTaskAPIError),
               title: ''
            })
      }
   )

   renderActions = () => {
      const { actions } = this.taskTemplate

      return (
         <ActionsWrapper>
            {actions.map(action => {
               const { actionId, buttontext, buttonColor } = action
               const otherProps = {
                  color: buttonColor
               }
               return (
                  <ActionButton
                     id={actionId}
                     key={buttontext}
                     text={buttontext}
                     onClick={this.taskValidate}
                     {...otherProps}
                  />
               )
            })}
         </ActionsWrapper>
      )
   }
   render() {
      const { t } = this.props
      return this.taskTemplate && this.taskDetails ? (
         <CreateRouteWrapper>
            <TemplateSelector>
               <TaskTemplateWrapper>
                  <DropDown
                     labelText={t(
                        'workflowManagement:routes.createTaskRoute.labelText'
                     )}
                     placeholder={t(
                        'workflowManagement:routes.CreateTaskRoute.placeholder'
                     )}
                     className={'field-height-width'}
                     options={this.getTaskTemplateNames()}
                     onChange={this.onChangeTaskTemplates}
                     value={{
                        label: this.getTaskTemplateName(
                           this.taskDetails.templateId
                        ),
                        value: this.taskDetails.templateId
                     }}
                  />
               </TaskTemplateWrapper>
            </TemplateSelector>
            <Task
               key={this.taskTemplate.templateId}
               taskTemplate={this.taskTemplate}
               taskDetails={this.taskDetails}
               ref={this.taskRef}
            />
            <TaskActionsFooter>{this.renderActions()}</TaskActionsFooter>
         </CreateRouteWrapper>
      ) : null
   }
}

export default withTranslation()(withTaskTemplates(CreateTaskComponent))
