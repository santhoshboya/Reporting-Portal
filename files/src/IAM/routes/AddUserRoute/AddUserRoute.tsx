import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import { getFormattedAPIErrorDescription } from '../../../Common/utils/APIErrorUtils'
import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../../Common/constants/ToastTypes'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import { UserStore } from '../../stores/UserStore'
import AddUser from '../../components/Users/AddUser/AddUser'
import { AddUserRequestObject } from '../../stores/types'
import { navigateToUserListScreen } from '../../utils/NavigationUtils'

interface AddUserRouteProps {
   userStore: UserStore
}
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface InjectedProps
   extends AddUserRouteProps,
      RouteComponentProps,
      WithTranslationProps {}

@inject('userStore')
@observer
class AddUserRoute extends Component<InjectedProps> {
   @observable networkError!: string

   constructor(props) {
      super(props)
      this.networkError = ''
   }

   componentDidMount() {
      this.getUserOptions()
   }
   getUserOptions = () => {
      this.getUsersStore().getUserOptions()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getUsersStore() {
      return this.getInjectedProps().userStore
   }
   onSuccessAddUserData = () => {
      const { history, t } = this.getInjectedProps()

      const message = t('iam:users.addUser.successMessage')
      const toastObject = {
         type: toastTypes.primary,
         message: message,
         title: ''
      }
      showToast(toastObject)
      navigateToUserListScreen(history)
   }
   onFailureAddUserData = error => {
      this.networkError = getFormattedAPIErrorDescription(error)
      const message = this.networkError
      const toastObject = {
         type: toastTypes.primary,
         message: message,
         title: ''
      }
      showToast(toastObject)
   }
   onClickAddUserData = (requestObject: AddUserRequestObject) => {
      const { addUserRequestAPI } = this.getUsersStore()
      addUserRequestAPI(
         this.onSuccessAddUserData,
         this.onFailureAddUserData,
         requestObject
      )
   }
   onCancelAddUserData = () => {
      const { history } = this.getInjectedProps()
      navigateToUserListScreen(history)
   }
   renderSuccessUI = observer(() => {
      const {
         getAddUserAPIStatus,
         formattedRoleOptions,
         formattedCompanyOptions,
         formattedTeamOptions,
         companies,
         addUserResponse
      } = this.getUsersStore()
      return (
         <AddUser
            onClickAddUserData={this.onClickAddUserData}
            onCancelAddUserData={this.onCancelAddUserData}
            addUserApiStatus={getAddUserAPIStatus}
            formattedTeams={formattedTeamOptions}
            formattedRoles={formattedRoleOptions}
            formattedCompanies={formattedCompanyOptions}
            companies={companies}
            addUserResponse={addUserResponse}
         />
      )
   })
   render() {
      const {
         getUserOptionsAPIStatus,
         getUserOptionsAPIError
      } = this.getUsersStore()
      return (
         <LoadingWrapper
            onRetry={this.getUserOptions}
            apiError={getUserOptionsAPIError}
            apiStatus={getUserOptionsAPIStatus}
            renderSuccessView={this.renderSuccessUI}
         />
      )
   }
}

export default withTranslation('translation', { withRef: false })(AddUserRoute)
