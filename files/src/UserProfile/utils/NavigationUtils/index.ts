import { History } from 'history'

import { getAccessToken } from '../../../Common/utils/StorageUtils'

import {
   USER_HOME_ROUTE_PATH,
   ADMIN_HOME_ROUTE_PATH,
   FORGOT_PASSWORD_ROUTE_PATH,
   LOGIN_ROUTE_PATH,
   LINK_HAS_EXPIRED_ROUTE_PATH
} from '../../constants/NavigationConstants'

export type RoleType = 'USER' | 'ADMIN'

export const isLoggedIn = () => getAccessToken() !== undefined

export const goToLoginRoute = (history: History) =>
   history.replace(LOGIN_ROUTE_PATH)

export const goToForgotPasswordRoute = (history: History) =>
   history.replace(FORGOT_PASSWORD_ROUTE_PATH)

export const goToLinkHasExpiredRoute = (history: History) =>
   history.replace(LINK_HAS_EXPIRED_ROUTE_PATH)

const choosePathByRole = (role: RoleType) => {
   switch (role) {
      case 'ADMIN':
         return USER_HOME_ROUTE_PATH
      case 'USER':
         return USER_HOME_ROUTE_PATH
   }
}

export const goToHomeRoute = (history: History, role: RoleType) => {
   history.replace(choosePathByRole(role))
}
