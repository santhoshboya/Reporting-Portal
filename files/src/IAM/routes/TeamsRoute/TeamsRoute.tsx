import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import Teams from '../../components/Teams/Teams'
import { goToAddTeam, goToEditTeam } from '../../utils/NavigationUtils'
import TeamModel from '../../stores/models/TeamModel'
import TeamsStore from '../../stores/TeamsStore'
import withSlimbarControllerRoute, {
   expandedIAMItemsInfo,
   routeInfo
} from '../../../hocs/withSlimbarControllerRoute'

interface TeamsRouteProps extends RouteComponentProps {
   any?: any
}

interface InjectedProps extends TeamsRouteProps {
   teamsStore: TeamsStore
}

@inject('teamsStore')
@observer
class TeamsRoute extends React.Component<TeamsRouteProps> {
   componentDidMount() {
      this.getTeamsStore().getTeams()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getTeamsStore = () => this.getInjectedProps().teamsStore

   getTeamsList = (): Array<TeamModel> => {
      const { teamsList } = this.getTeamsStore()
      if (teamsList) {
         return Array.from(teamsList.values())
      }
      return []
   }

   navigateToAddTeam = () => {
      const { history } = this.props
      goToAddTeam(history)
   }

   navigateToEditTeam = (teamId: string) => {
      const { history } = this.props
      goToEditTeam(history, teamId)
   }

   renderSuccessView = observer(() => {
      const { onDeleteTeam } = this.getTeamsStore()
      return (
         <Teams
            goToEditTeam={this.navigateToEditTeam}
            onDeleteTeam={onDeleteTeam}
            teams={this.getTeamsList()}
            goToAddTeam={this.navigateToAddTeam}
         />
      )
   })

   render() {
      const {
         getTeamsAPIStatus,
         getTeamsAPIError,
         deleteTeamsAPIStatus,
         getTeams
      } = this.getTeamsStore()

      return (
         <LoadingWrapper
            apiStatus={getTeamsAPIStatus | deleteTeamsAPIStatus}
            apiError={getTeamsAPIError}
            onRetry={getTeams}
            renderSuccessView={this.renderSuccessView}
         ></LoadingWrapper>
      )
   }
}

export default withSlimbarControllerRoute(TeamsRoute, {
   defaultActiveSlimbarCollapsedId: routeInfo.iam,
   defaultActiveSlimbarExpandedId: expandedIAMItemsInfo.teams,
   defaultIsExpanded: true
})
