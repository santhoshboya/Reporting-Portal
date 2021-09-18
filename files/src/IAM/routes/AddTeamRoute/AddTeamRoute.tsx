import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import AddTeam from '../../components/Teams/AddTeam'
import { goToTeamsPage } from '../../utils/NavigationUtils'
import TeamsStore from '../../stores/TeamsStore'
import UserSearchStore from '../../stores/UserSearchStore'

interface AddTeamRouteProps extends RouteComponentProps {}

interface InjectedProps extends AddTeamRouteProps {
   teamsStore: TeamsStore
   userSearchStore: UserSearchStore
}

@inject('teamsStore', 'userSearchStore')
@observer
class AddTeamRoute extends Component<AddTeamRouteProps> {
   componentDidMount() {
      this.getInjectedProps().userSearchStore.getUsers()
   }

   componentWillUnmount() {
      this.getInjectedProps().teamsStore.clearStore()
      this.getInjectedProps().userSearchStore.clearStore()
   }

   navigateBack = () => {
      const { history } = this.props
      goToTeamsPage(history)
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getUsers = () => {
      const { usersList } = this.getInjectedProps().userSearchStore
      return Array.from(usersList.values())
   }

   renderSuccessView = observer(() => {
      const {
         onAddTeam,
         postTeamsAPIStatus,
         postTeamsAPIError
      } = this.getInjectedProps().teamsStore

      return (
         <AddTeam
            members={this.getUsers()}
            goBack={this.navigateBack}
            onAddTeam={onAddTeam}
            addTeamApiStatus={postTeamsAPIStatus}
            addTeamApiError={postTeamsAPIError}
         />
      )
   })

   render() {
      const {
         getUsersAPIStatus,
         getUsersAPIError,
         getUsers
      } = this.getInjectedProps().userSearchStore
      return (
         <LoadingWrapper
            apiStatus={getUsersAPIStatus}
            apiError={getUsersAPIError}
            onRetry={getUsers}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withRouter(AddTeamRoute)
