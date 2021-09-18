import { RouteComponentProps } from 'react-router-dom'
import React, { Component } from 'react'
import { History } from 'history'
import withSlimbarControllerRoute, {
   routeInfo
} from '../../../hocs/withSlimbarControllerRoute'

import 'twin.macro'

import { action } from 'mobx'
import { withTranslation } from 'react-i18next'
import { API_FETCHING } from '@ib/api-constants'

import { goToCreateTask } from '../../../WorkflowManagement/utils/NavigationUtils'
import TaskStore from '../../../WorkflowManagement/stores/TaskStore'
import WorkflowUiStore from '../../../WorkflowManagement/stores/WorkflowUiStore'

import UserProfileDetailsStore from '../../../UserProfile/stores/UserProfileDetailsStore'

import UserProfileDetailsHeader from '../../components/UserProfileDetailsHeader'

import AuthStore from '../../../UserProfile/stores/AuthStore'

import { observer, inject } from 'mobx-react'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface HomeRouteProps extends RouteComponentProps, WithTranslationProps {
   history: History
}

interface InjectedProps extends HomeRouteProps {
   userProfileDetailsStore: UserProfileDetailsStore
   authStore: AuthStore
   taskStore: TaskStore
   workflowUiStore: WorkflowUiStore
}

@inject(
   'authStore',
   'userProfileDetailsStore',
   'taskStore',
   'workflowUiStore',
   'userProfileDetailsStore'
)
@observer
class Home extends Component<HomeRouteProps> {
   handleNavigation = () => {
      const { history } = this.props
      goToCreateTask(history)
   }
   componentDidMount() {
      if (this.getuserProfileDetailsStore().userProfileDetails.userId === '')
         this.fetchUserProfileDetailsData()
   }

   @action.bound
   fetchUserProfileDetailsData() {
      this.getuserProfileDetailsStore().getUserProfileDetails()
   }

   getInjectedProps = () => this.props as InjectedProps

   getuserProfileDetailsStore = () =>
      this.getInjectedProps().userProfileDetailsStore

   getAuthStore = () => this.getInjectedProps().authStore

   getTaskStore = () => this.getInjectedProps().taskStore

   getWorkflowUiStore = () => this.getInjectedProps().workflowUiStore

   renderHeader = () => {
      const { getuserProfileDetailsStore } = this
      const {
         userLogoutHandler: logout,
         getLogoutAPIStatus,
         userProfileDetails: { userName, profilePicURL }
      } = getuserProfileDetailsStore()
      return (
         <UserProfileDetailsHeader
            {...{ logout }}
            userName={userName}
            profilePicURL={profilePicURL}
            isLoggingout={getLogoutAPIStatus === API_FETCHING}
         />
      )
   }

   handleCreateTask = () => {
      const { setCreateTaskModalOpen } = this.getWorkflowUiStore()
      setCreateTaskModalOpen()
   }

   handleUpdateTask = () => {
      const { onChangeSelectedTaskId } = this.getTaskStore()
      onChangeSelectedTaskId('taskId')
      const { setUpdateTaskModalOpen } = this.getWorkflowUiStore()
      setUpdateTaskModalOpen()
   }
}

export default withSlimbarControllerRoute(Home, {
   defaultActiveSlimbarCollapsedId: routeInfo.home,
   defaultIsExpanded: false,
   hideSlimbarExpandedView: true
})
