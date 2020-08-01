import { API_FETCHING } from '@ib/api-constants'

export function getFormattedRoleOptions(roles) {
   return roles.map(eachRole => {
      const object = {
         value: eachRole.roleId,
         label: eachRole.roleName
      }
      return object
   })
}
export function getFormattedCompanyOptions(companies) {
   return companies.map(eachRole => {
      const object = {
         value: eachRole.companyName,
         label: eachRole.companyName
      }
      return object
   })
}
export function getFormattedTeamOptions(teams) {
   return teams.map(eachTeam => {
      const object = {
         value: eachTeam.teamId,
         label: eachTeam.teamName
      }
      return object
   })
}
export function isFetching(apiStatus) {
   return apiStatus === API_FETCHING
}
