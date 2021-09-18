import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../../Common/constants/ToastTypes'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { getFormattedAPIErrorDescription } from '../../../Common/utils/APIErrorUtils'
import { getLoadingStatus } from '../../../Common/utils/APIStatusUtils'

import { UserStore } from '../../stores/UserStore'
import { EditUserRequestObject } from '../../stores/types'
import { EditUserDetails } from '../../components/Users/EditUserDetails'

import { navigateToUserListScreen } from '../../utils/NavigationUtils'

interface EditUserRouteProps {
   userStore: UserStore
}
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface InjectedProps
   extends EditUserRouteProps,
      RouteComponentProps,
      WithTranslationProps {
   match: any
}

@inject('userStore')
@observer
class EditUserRoute extends Component<InjectedProps> {
   @observable networkError!: string
   userId: string
   @observable userObject: any

   constructor(props) {
      super(props)
      this.networkError = ''

      this.userId = this.props.location.pathname.slice(-1)
   }
   componentDidMount() {
      this.getUserOptions()
      this.getPaginationStore().changeCurrentPage(1)
      this.getUsersDetails()
   }

   goBack = () => {
      const { history } = this.getInjectedProps()
      history.goBack()
   }
   getUserId = (): string => this.props.match.params.user_id

   getCurrentPage = (): any => this.props.match.params.current_page

   getPaginationStore = () => this.getUsersStore().paginationStore

   getUsersDetails = () => {
      this.getPaginationStore().changeCurrentPage(
         parseInt(this.getCurrentPage())
      )
   }

   getUserOptions = () => {
      this.getUsersStore().getUserOptions()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getUsersStore() {
      return this.getInjectedProps().userStore
   }
   onSuccessEditUserData = () => {
      const { history } = this.getInjectedProps()
      const { t } = this.props
      const message = t('iam:users.edituser.successMessage')
      const toastObject = {
         type: toastTypes.info,
         message: message,
         title: ''
      }
      showToast(toastObject)
      navigateToUserListScreen(history)
   }
   onFailureEditUserData = error => {
      this.networkError = getFormattedAPIErrorDescription(error)
      const message = this.networkError
      const toastObject = {
         type: toastTypes.primary,
         message: message,
         title: ''
      }
      showToast(toastObject)
   }
   onClickEditUserData = (requestObject: EditUserRequestObject) => {
      this.userObject.editUserDetailsAPI(
         this.onSuccessEditUserData,
         this.onFailureEditUserData,
         requestObject
      )
   }
   onCancelEditUser = () => {
      const { history } = this.getInjectedProps()
      navigateToUserListScreen(history)
   }

   renderSuccessUI = observer(() => {
      const {
         formattedRoleOptions,
         companies,
         formattedTeamOptions,
         formattedCompanyOptions
      } = this.getUsersStore()

      this.userObject = this.getPaginationStore().entitiesMap.get(
         this.getUserId()
      )
      if (this.userObject) {
         const { getEditUserAPIStatus } = this.userObject
         return (
            <EditUserDetails
               onClickEditUserData={this.onClickEditUserData}
               onCancelEditUser={this.onCancelEditUser}
               userObject={this.userObject}
               teams={formattedTeamOptions}
               roles={formattedRoleOptions}
               formattedCompanies={formattedCompanyOptions}
               companies={companies}
               editUserApiStatus={getEditUserAPIStatus}
               goBack={this.goBack}
            />
         )
      }
      return null
   })
   render() {
      const {
         getUserOptionsAPIStatus,
         getUserOptionsAPIError
      } = this.getUsersStore()
      const { entitiesFetchingStatus } = this.getPaginationStore()

      return (
         <LoadingWrapper
            onRetry={this.getUserOptions}
            apiError={getUserOptionsAPIError}
            apiStatus={getLoadingStatus(
               getUserOptionsAPIStatus,
               entitiesFetchingStatus
            )}
            renderSuccessView={this.renderSuccessUI}
         />
      )
   }
}

export default withRouter(
   withTranslation('translation', { withRef: false })(EditUserRoute)
)
