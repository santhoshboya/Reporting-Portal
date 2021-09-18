import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'

import { withTranslation } from 'react-i18next'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import PaginationNavigation from '../../../Common/components/PaginationNavigation'
import { showToast } from '../../../Common/utils/ToastUtils/ToastUtil'
import { toastTypes } from '../../../Common/constants/ToastTypes'
import { getFormattedAPIErrorDescription } from '../../../Common/utils/APIErrorUtils'

import { UsersListHeader } from '../../components/Users/UsersListHeader'
import { Users } from '../../components/Users'
import { UserStore } from '../../stores/UserStore'
import { navigateToEditUserDetailsScreen } from '../../utils/NavigationUtils/index'

import withSlimbarControllerRoute, {
   expandedIAMItemsInfo,
   routeInfo
} from '../../../hocs/withSlimbarControllerRoute'
import { showConfirmDialog } from '../../../Common/utils/ConfirmationDialogUtils'
import { RouteContainer, UsersWrapper } from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
interface InjectedProps extends RouteComponentProps, WithTranslationProps {
   userStore: UserStore
}

@inject('userProfileDetailsStore')
@inject('userStore')
@observer
class UsersRoute extends Component<InjectedProps> {
   @observable currentPage!: number
   @observable networkError!: string

   constructor(props) {
      super(props)
      this.currentPage = 1
      this.networkError = ''
   }
   componentDidMount() {
      this.getUserDetails()
   }

   getUserDetails = () => {
      this.getPaginationStore().changeCurrentPage(1)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getUsersStore = () => this.getInjectedProps().userStore

   navigateToEditDetailsScreen = userId => {
      this.currentPage = this.getPaginationStore().currentPage

      const { history } = this.props
      navigateToEditUserDetailsScreen(history, userId, this.currentPage)
   }
   onSuccessDeleteUserData = () => {
      const { t } = this.props
      const message = t('iam:users.deleteUser.successMessage')
      const toastObject = {
         type: toastTypes.primary,
         message: message,
         title: ''
      }
      this.getUserDetails()
      showToast(toastObject)
   }
   onFailureDeleteUserData = error => {
      this.networkError = getFormattedAPIErrorDescription(error)
      const message = this.networkError
      const toastObject = {
         type: toastTypes.primary,
         message: message,
         title: ''
      }
      showToast(toastObject)
   }
   getUserList = () => {
      this.getPaginationStore().clearPagesCache()
   }

   onClickDeleteUser = (userId: string) => {
      this.getUsersStore().deleteUserDetails(
         this.onSuccessDeleteUserData,
         this.onFailureDeleteUserData,
         userId
      )
   }

   getPaginationStore = () => this.getUsersStore().paginationStore

   onChangePage = (page: number): void => {
      this.getPaginationStore().changeCurrentPage(page)
   }
   renderSuccessUI = () => {
      const { currentPageEntities } = this.getPaginationStore()

      const offset = this.getPaginationStore().getPaginationForPage(
         this.getPaginationStore().currentPage
      ).offset
      if (currentPageEntities.length > 0) {
         return (
            <Users
               offset={offset}
               onClickDeleteUser={this.onClickDeleteUser}
               navigateToEditDetailsScreen={this.navigateToEditDetailsScreen}
               usersList={currentPageEntities}
            />
         )
      }
      return <div>No Users Found</div>
   }
   onClickLogout = () => {}
   render() {
      const {
         onChangePage: onPagePress,
         getUsersStore,
         getPaginationStore,
         getUserDetails
      } = this

      const { onChangeUsersSearchText } = getUsersStore()

      const {
         entitiesFetchingStatus: apiStatus,
         apiError,

         currentPage,
         totalEntities: totalNoOfItems,
         showPerPage: itemsPerPage,
         totalPages: maxDisplayPagesCount
      } = getPaginationStore()

      return (
         <UsersWrapper>
            <RouteContainer>
               <UsersListHeader
                  {...{
                     onChangeUsersSearchText,
                     getUserDetails
                  }}
               />
               <LoadingWrapper
                  {...{ apiError, apiStatus }}
                  onRetry={getUserDetails}
                  renderSuccessView={this.renderSuccessUI}
               />

               <PaginationNavigation
                  type={PaginationNavigation.types.advanced}
                  {...{
                     onPagePress,
                     totalNoOfItems,
                     currentPage: currentPage > 0 ? currentPage : 1,
                     itemsPerPage,
                     maxDisplayPagesCount
                  }}
               />
            </RouteContainer>
         </UsersWrapper>
      )
   }
}

export default withSlimbarControllerRoute(
   withTranslation('translation', { withRef: false })(UsersRoute),
   {
      defaultActiveSlimbarCollapsedId: routeInfo.iam,
      defaultActiveSlimbarExpandedId: expandedIAMItemsInfo.users,
      defaultIsExpanded: true
   }
)
