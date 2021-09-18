import { History } from 'history'

import {
   ADD_USER,
   USER_LIST,
   TEAMS_ROUTE,
   ADD_TEAM_ROUTE,
   EDIT_TEAM_PATH,
   ADD_COMPANY_ROUTE,
   COMPANIES_ROUTE,
   EDIT_COMPANY_PATH,
   EDIT_USER_PATH
} from '../../constants/navigationConstants'

export function navigateToAddUserScreen(history: History) {
   history.push(ADD_USER)
}
export function navigateToEditUserDetailsScreen(
   history: History,
   userId,
   currentpage
) {
   history.push(`${EDIT_USER_PATH}${currentpage}/${userId}`)
}
export function navigateToUserListScreen(history: History) {
   history.push(USER_LIST)
}

export const goToTeamsPage = (history: History) => {
   history.replace(TEAMS_ROUTE)
}

export const goToAddTeam = (history: History) => {
   history.push(ADD_TEAM_ROUTE)
}

export const goToEditTeam = (history: History, teamId: string) => {
   history.push(`${EDIT_TEAM_PATH}${teamId}`)
}

export const goToCompaniesPage = (history: History) => {
   history.replace(COMPANIES_ROUTE)
}

export const goToAddCompanyPage = (history: History) => {
   history.push(ADD_COMPANY_ROUTE)
}

export const goToEditCompanyPage = (history: History, companyId: string) => {
   history.push(`${EDIT_COMPANY_PATH}${companyId}`)
}
