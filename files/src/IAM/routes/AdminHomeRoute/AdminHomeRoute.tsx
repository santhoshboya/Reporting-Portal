import React, { Component } from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { API_FETCHING } from '@ib/api-constants'

import UserHeader from '../../../Common/components/UserProfileDetailsHeader'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import UserProfileDetailsStore from '../../../UserProfile/stores/UserProfileDetailsStore/UserProfileDetailsStore'

import { TEAMS_ROUTE, USER_LIST } from '../../constants/navigationConstants'

// FIXME: Resolve the WithTranslation import issue & replace custom WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface AdminHomeRouteProps
   extends RouteComponentProps,
      WithTranslationProps {}

interface InjectedProps extends AdminHomeRouteProps {
   userProfileDetailsStore: UserProfileDetailsStore
}

@inject('userProfileDetailsStore')
@observer
class AdminHomeRoute extends Component<AdminHomeRouteProps> {
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

   renderHeader = observer(() => {
      const { getuserProfileDetailsStore } = this
      const {
         userProfileDetails,
         userLogoutHandler: logout,
         getLogoutAPIStatus
      } = getuserProfileDetailsStore()
      return (
         <UserHeader
            {...{ logout }}
            userName={userProfileDetails.userName}
            profilePicURL={userProfileDetails.profilePicURL}
            isLoggingout={getLogoutAPIStatus === API_FETCHING}
         />
      )
   })

   render() {
      const { fetchUserProfileDetailsData, getuserProfileDetailsStore } = this
      const {
         getUserProfileDetailsAPIStatus,
         getUserProfileDetailsAPIError
      } = getuserProfileDetailsStore()

      // FIXME: Add i18n translations

      return (
         <div>
            <LoadingWrapper
               apiStatus={getUserProfileDetailsAPIStatus}
               apiError={getUserProfileDetailsAPIError as Error}
               onRetry={fetchUserProfileDetailsData}
               renderSuccessView={this.renderHeader}
            />
            AdminRoute
            <a href={TEAMS_ROUTE}>TeamsList</a>
            <a href={USER_LIST}>UsersList</a>
         </div>
      )
   }
}

export default withTranslation()(withRouter(AdminHomeRoute))
