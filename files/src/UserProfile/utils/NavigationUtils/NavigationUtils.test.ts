import { getAccessToken } from '../../../Common/utils/StorageUtils'

import {
   LOGIN_ROUTE_PATH,
   USER_HOME_ROUTE_PATH,
   ADMIN_HOME_ROUTE_PATH,
   FORGOT_PASSWORD_ROUTE_PATH,
   LINK_HAS_EXPIRED_ROUTE_PATH
} from '../../constants/NavigationConstants'

import {
   isLoggedIn,
   goToLoginRoute,
   goToHomeRoute,
   goToForgotPasswordRoute,
   goToLinkHasExpiredRoute
} from '.'

describe('NavigationUtils', () => {
   it('Should test isLoggedIn()', () => {
      if (getAccessToken()) expect(isLoggedIn()).toBeTruthy()
      else expect(isLoggedIn()).toBeFalsy()
   })

   it('Should test LoginRoute Navigation', () => {
      const mockHistoryObject: any = {
         replace: jest.fn()
      }
      goToLoginRoute(mockHistoryObject)
      expect(mockHistoryObject.replace).toBeCalledWith(LOGIN_ROUTE_PATH)
   })

   it('Should test User & Admin HomeRoutes Navigation', () => {
      const mockHistoryObject: any = {
         replace: jest.fn()
      }
      goToHomeRoute(mockHistoryObject, 'USER')
      expect(mockHistoryObject.replace).toBeCalledWith(USER_HOME_ROUTE_PATH)

      goToHomeRoute(mockHistoryObject, 'ADMIN')
      expect(mockHistoryObject.replace).toBeCalledWith(ADMIN_HOME_ROUTE_PATH)
   })

   it('Should test ForgotPasswordRoute Navigation', () => {
      const mockHistoryObject: any = {
         replace: jest.fn()
      }
      goToForgotPasswordRoute(mockHistoryObject)
      expect(mockHistoryObject.replace).toBeCalledWith(
         FORGOT_PASSWORD_ROUTE_PATH
      )
   })

   it('Should test LinkHasExpiredRoute Navigation', () => {
      const mockHistoryObject: any = {
         replace: jest.fn()
      }
      goToLinkHasExpiredRoute(mockHistoryObject)
      expect(mockHistoryObject.replace).toBeCalledWith(
         LINK_HAS_EXPIRED_ROUTE_PATH
      )
   })
})
