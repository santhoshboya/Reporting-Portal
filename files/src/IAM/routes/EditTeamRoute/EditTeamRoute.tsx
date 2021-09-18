import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import TeamsStore from '../../stores/TeamsStore'
import { goToTeamsPage } from '../../utils/NavigationUtils'
import EditTeam from '../../components/Teams/EditTeam'
import UserSearchStore from '../../stores/UserSearchStore'

interface EditTeamRouteProps extends RouteComponentProps {
   match: any //FIXME: Define type
}

interface InjectedProps extends EditTeamRouteProps {
   teamsStore: TeamsStore
   userSearchStore: UserSearchStore
}

@inject('teamsStore', 'userSearchStore')
@observer
class EditTeamRoute extends Component<EditTeamRouteProps> {
   componentDidMount() {
      this.getData()
   }

   getData = () => {
      this.getInjectedProps().userSearchStore.getUsers()
      this.getInjectedProps().teamsStore.getTeams()
      this.getTeamInstance()
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

   getTeamId = (): string => this.props.match.params.team_id

   getTeamInstance = () =>
      this.getInjectedProps().teamsStore.teamsList.get(this.getTeamId())

   getMembers = () => {
      const { usersList } = this.getInjectedProps().userSearchStore
      return Array.from(usersList.values())
   }

   renderSuccessView = observer(() => (
      <EditTeam
         members={this.getMembers()}
         goBack={this.navigateBack}
         team={this.getTeamInstance()}
      />
   ))

   render() {
      const {
         getUsersAPIError,
         getUsersAPIStatus
      } = this.getInjectedProps().userSearchStore
      const { getTeamsAPIStatus } = this.getInjectedProps().teamsStore
      return (
         <LoadingWrapper
            apiStatus={getUsersAPIStatus & getTeamsAPIStatus}
            apiError={getUsersAPIError}
            onRetry={this.getData}
            renderSuccessView={this.renderSuccessView}
         />
      )
   }
}

export default withRouter(EditTeamRoute)
