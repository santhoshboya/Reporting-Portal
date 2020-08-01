import React from 'react'
import { inject, observer } from 'mobx-react'
import { reaction } from 'mobx'
import { API_SUCCESS, API_FAILED } from '@ib/api-constants'

import TaskTemplateStore from '../../../WorkflowManagement/stores/TaskTemplateStore'
import { getFormattedAPIErrorDescription } from '../../utils/APIErrorUtils'
import LoadingWrapper from '../../components/LoadingWrapper'
import { showToast } from '../../utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../constants/ToastTypes'
interface InjectedProps {
   taskTemplateStore: TaskTemplateStore
}

function withTaskTemplates<T>(WrappedComponent: React.ComponentType<T>) {
   @inject('taskTemplateStore')
   @observer
   class EnhancedComponent extends React.Component<T & InjectedProps> {
      get injected() {
         return this.props as InjectedProps
      }

      get getTaskTemlateStore() {
         return this.props.taskTemplateStore
      }

      componentDidMount() {
         if (this.getTaskTemlateStore.taskTemplateAPIStatus !== API_SUCCESS) {
            this.doNetworkCall()
         }
      }

      componentWillUnmount() {
         this.onFailureTaskTemplates()
      }

      doNetworkCall = () => {
         this.getTaskTemlateStore.getTaskTemplates()
      }

      renderWrappedComponent = () => {
         const props = this.props as T

         return <WrappedComponent {...props} />
      }

      onFailureTaskTemplates = reaction(
         () => {
            const { taskTemplateAPIStatus } = this.getTaskTemlateStore
            return taskTemplateAPIStatus === API_FAILED
         },
         status => {
            const { taskTemplateAPIError } = this.getTaskTemlateStore
            if (status)
               showToast({
                  type: toastTypes.danger,
                  message: getFormattedAPIErrorDescription(
                     taskTemplateAPIError
                  ),
                  title: ''
               })
         }
      )

      render() {
         return (
            <LoadingWrapper
               apiStatus={this.getTaskTemlateStore.taskTemplateAPIStatus}
               apiError={this.getTaskTemlateStore.taskTemplateAPIError}
               onRetry={this.doNetworkCall}
               renderSuccessView={this.renderWrappedComponent}
            />
         )
      }
   }
   return EnhancedComponent
}

export default withTaskTemplates
