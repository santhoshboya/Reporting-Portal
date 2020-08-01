import { getAccessToken } from '../../../Common/utils/StorageUtils'

import { TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH } from '../../constants/NavigationConstants'

import { isLoggedIn, goToTaskSpecificDiscussionsRoutePath } from '.'

describe('NavigationUtils', () => {
   it('Should test isLoggedIn()', () => {
      if (getAccessToken()) expect(isLoggedIn()).toBeTruthy()
      else expect(isLoggedIn()).toBeFalsy()
   })

   it('Should test LoginRoute Navigation', () => {
      const mockHistoryObject: any = {
         replace: jest.fn()
      }
      goToTaskSpecificDiscussionsRoutePath(mockHistoryObject)
      expect(mockHistoryObject.replace).toBeCalledWith(
         TASK_SPECIFIC_DISCUSSIONS_ROUTE_PATH
      )
   })
})
