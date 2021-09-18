import React, { Component } from 'react'
import { observable } from 'mobx'
import 'twin.macro'
import { observer, inject } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import HomeIcon from '../../Common/icons/HomeIcon'
import HistoryIcon from '../../Common/icons/HistoryIcon'
import DrawerIcon from '../../Common/icons/DrawerIcon'
import SlimbarControllerWithHeader from '../../Common/components/SlimbarControllerWithHeader'
import Button from '../../Common/components/Button'
import {
   goToTeamsPage,
   navigateToUserListScreen,
   goToCompaniesPage
} from '../../IAM/utils/NavigationUtils'
import { navigateToHome } from '../../Common/utils/NavigationUtils'

import BoardsListController from '../../WorkflowManagement/components/BoardsListController'
import BoardsHeaderController from '../../WorkflowManagement/components/BoardsHeaderController'
import ProfileIcon from '../../Common/icons/ProfileIcon'
import { goToLoginRoute } from '../../UserProfile/utils/NavigationUtils'
import { showConfirmDialog } from '../../Common/utils/ConfirmationDialogUtils'
import FilledDrawerIcon from '../../Common/icons/FilledDrawerIcon'
import {
   MainSection,
   MainSectionContentContainer,
   IAMRoutesButtonsContainer,
   ChildrenDiv
} from './styledComponents'

export const routeInfo = {
   home: 'home',
   iam: 'iam',
   board: 'board'
}

export const expandedIAMItemsInfo = {
   users: 'users',
   teams: 'teams',
   companies: 'companies'
}

export default function WithSlimbarControllerRoute<T>(
   WrappedComponent: React.ComponentType<T>,
   config?: any
) {
   interface EnhancedComponentProps {
      history
      location
      match
      userProfileDetailsStore?: any
   }
   interface InjectedProps {
      userProfileDetailsStore?: any
   }
   @inject('userProfileDetailsStore')
   @observer
   class EnhancedComponent extends Component<EnhancedComponentProps> {
      @observable isExpanded!: boolean
      @observable activeSlimbarCollapsedItemId!: string
      @observable activeSlimbarExpandedItemId!: string
      hideSlimbarExpandedView!: boolean

      collapsedItems = [
         {
            id: routeInfo.home,
            content: HomeIcon,
            contentOnActive: HomeIcon,
            expandedItems: [],
            renderCustomSlimbarExpandedView: false,
            onClickSlimbarItem: navigateToHome
         },
         {
            id: routeInfo.iam,
            content: HistoryIcon,
            contentOnActive: HistoryIcon,
            expandedItems: [
               {
                  id: expandedIAMItemsInfo.users,
                  content: 'Users',
                  onClickSlimbarItem: navigateToUserListScreen
               },
               {
                  id: expandedIAMItemsInfo.teams,
                  content: 'Teams',
                  onClickSlimbarItem: goToTeamsPage
               },
               {
                  id: expandedIAMItemsInfo.companies,
                  content: 'Companies',
                  onClickSlimbarItem: goToCompaniesPage
               }
            ],
            renderCustomSlimbarExpandedView: false,
            onClickSlimbarItem: navigateToUserListScreen
         },
         {
            id: routeInfo.board,
            content: DrawerIcon,
            contentOnActive: FilledDrawerIcon,
            routeInfo: routeInfo.board,
            renderCustomSlimbarExpandedView: true,
            customSlimbarExpandedView: () => <BoardsListController />,
            onClickSlimbarItem: history => {
               history.push('/boards')
            }
         }
      ]

      onSuccessLogout = () => {
         goToLoginRoute(this.props.history)
      }
      onFailureLogout = () => {
         console.log('onFailure')
      }
      onConfirmLogout = () => {
         this.getInjectedProps().userProfileDetailsStore.userLogoutHandler(
            this.onSuccessLogout,
            this.onFailureLogout
         )
      }
      onClickLogout = () => {
         showConfirmDialog({
            message: 'Are you sure ?', //Handle i18n translations
            onConfirm: () => this.onConfirmLogout()
         })
      }

      footerData = [
         {
            id: 'FooterData',
            content: ProfileIcon,
            contentOnActive: ProfileIcon,
            onClickSlimbarItem: this.onClickLogout
         }
      ]

      constructor(props) {
         super(props)
         const {
            defaultActiveSlimbarCollapsedId,
            defaultActiveSlimbarExpandedId,
            defaultIsExpanded,
            hideSlimbarExpandedView
         } = config
         this.hideSlimbarExpandedView = hideSlimbarExpandedView || false
         this.isExpanded = defaultIsExpanded || false
         this.activeSlimbarCollapsedItemId =
            defaultActiveSlimbarCollapsedId || routeInfo.home
         this.activeSlimbarExpandedItemId =
            defaultActiveSlimbarExpandedId || undefined
         this.onClickLogout = this.onClickLogout.bind(this)
      }
      getInjectedProps = (): InjectedProps => this.props as InjectedProps

      setActiveSlimbarCollapsedItem = activeSlimbarCollapsedItemId => {
         this.setIsExpanded()
         const slimbarConfig = this.collapsedItems.find(
            ({ id }) => id === activeSlimbarCollapsedItemId
         )
         const slimbarFooterConfig = this.footerData.find(
            ({ id }) => id === activeSlimbarCollapsedItemId
         )

         if (slimbarConfig?.onClickSlimbarItem) {
            slimbarConfig?.onClickSlimbarItem(this.props.history)
         }
         if (slimbarFooterConfig?.onClickSlimbarItem) {
            slimbarFooterConfig?.onClickSlimbarItem()
         }
      }

      setIsExpanded = () => (this.isExpanded = !this.isExpanded)

      renderOrHideCustomOrDefaultSlimbarExpandedView = () => {
         const {
            collapsedItems,
            activeSlimbarCollapsedItemId,
            activeSlimbarExpandedItemId
         } = this
         const slimbarConfig = collapsedItems.find(
            ({ id }) => id === activeSlimbarCollapsedItemId
         )
         const expandedItems = slimbarConfig?.expandedItems

         if (slimbarConfig?.customSlimbarExpandedView) {
            const {
               customSlimbarExpandedView: CustomSlimbarExpandedView
            } = slimbarConfig
            return <CustomSlimbarExpandedView />
         }

         if (this.hideSlimbarExpandedView) {
            return null
         }

         return (
            <IAMRoutesButtonsContainer>
               {expandedItems &&
                  expandedItems.map(({ id, content, onClickSlimbarItem }) => (
                     <Button
                        key={id}
                        type={
                           activeSlimbarExpandedItemId === id
                              ? Button.types.filled
                              : Button.types.outline
                        }
                        size={Button.sizes.large}
                        text={content}
                        width='100%'
                        onClick={() => onClickSlimbarItem(this.props.history)}
                     />
                  ))}
            </IAMRoutesButtonsContainer>
         )
      }

      renderSlimbarExpandedView = (
         activeSlimbarCollapsedItemId,
         isExpanded
      ) => {
         const { renderOrHideCustomOrDefaultSlimbarExpandedView } = this
         if (isExpanded) {
            switch (activeSlimbarCollapsedItemId) {
               case routeInfo.home:
                  return renderOrHideCustomOrDefaultSlimbarExpandedView()
               case routeInfo.iam:
                  return renderOrHideCustomOrDefaultSlimbarExpandedView()
               case routeInfo.board:
                  return renderOrHideCustomOrDefaultSlimbarExpandedView()
               case 'FooterData':
                  return renderOrHideCustomOrDefaultSlimbarExpandedView()
                  break
               default:
                  return <div>Default Home</div>
            }
         }
         return null
      }

      render() {
         const props = this.props as any
         const {
            renderSlimbarExpandedView,
            collapsedItems,
            footerData,
            isExpanded,
            activeSlimbarCollapsedItemId,
            setActiveSlimbarCollapsedItem,
            setIsExpanded
         } = this

         return (
            <SlimbarControllerWithHeader
               setIsExpanded={setIsExpanded}
               isExpanded={isExpanded}
               activeSlimbarCollapsedItemId={activeSlimbarCollapsedItemId}
               setActiveItem={setActiveSlimbarCollapsedItem}
               slimBarExpandedView={renderSlimbarExpandedView}
               slimbarCollapsedHeaderData={collapsedItems}
               slimbarCollapsedFooterData={footerData}
               renderHeader={() => (
                  <SlimbarControllerWithHeader.header>
                     <BoardsHeaderController
                        shouldShowBoardsDropDown={
                           this.activeSlimbarCollapsedItemId === routeInfo.board
                        }
                     />
                  </SlimbarControllerWithHeader.header>
               )}
            >
               <MainSection>
                  <MainSectionContentContainer>
                     <WrappedComponent {...props} />
                  </MainSectionContentContainer>
               </MainSection>
            </SlimbarControllerWithHeader>
         )
      }
   }
   return withRouter(EnhancedComponent)
}

// TODO: Handle i18n translations
