class TeamsModel {
   teamId
   teamName

   constructor(team) {
      this.teamId = team.team_id
      this.teamName = team.team_name
   }
}
export { TeamsModel }
