import React, { Component, ReactNodeArray } from 'react'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next'

import AddTeamOrCompanyCard from '../../Common/components/AddTeamOrCompanyCard'
import TeamModel from '../../stores/models/TeamModel'

import Team from './Team/Team'
import {
   TeamsWrapper,
   Headline,
   TeamsListContainer,
   NoTeamsView,
   NoTeamsCaption
} from './styledComponents'

interface TeamsProps extends WithTranslation {
   teams: Array<TeamModel>
   goToAddTeam: () => void
   onDeleteTeam: (teamId: string) => any
   goToEditTeam: (teamId: string) => void
}

@observer
class Teams extends Component<TeamsProps> {
   renderTeams = (teams: Array<TeamModel>): ReactNodeArray => {
      const { onDeleteTeam, goToEditTeam } = this.props
      return teams.map(team => (
         <Team
            goToEditTeam={goToEditTeam}
            onDeleteTeam={onDeleteTeam}
            key={team.id}
            teamDetails={team}
         />
      ))
   }

   renderTeamsOrNoTeamsView = (): JSX.Element => {
      const { goToAddTeam, teams, t } = this.props
      //NOTE: Need to add as per the screen given
      if (teams.length === 0) {
         return (
            <NoTeamsView>
               <NoTeamsCaption>{t('iam:teams.noTeams')}</NoTeamsCaption>
            </NoTeamsView>
         )
      }
      return (
         <TeamsListContainer>
            {this.renderTeams(teams)}
            <AddTeamOrCompanyCard
               onClickCard={goToAddTeam}
               label={t('iam:teams.addTeam')}
            />
         </TeamsListContainer>
      )
   }

   render() {
      const { t } = this.props
      return (
         <TeamsWrapper>
            <Headline>{t('iam:teams.heading')}</Headline>
            {this.renderTeamsOrNoTeamsView()}
         </TeamsWrapper>
      )
   }
}

export default withTranslation()(Teams)
