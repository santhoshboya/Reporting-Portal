import BoardsService from '.'
import { ApisauceInstance, create } from 'apisauce'
import Config from '../../../Common/constants/EnvironmentConstants'
import { BoardsApiResponse } from '../../stores/types'
import endpoints from '../endpoints'
import { apiMethods } from '../../../Common/constants/APIConstants'
const AUTH_URL = `${Config.NKB_BASE_URL}nkb_auth/`
class BoardsApiService implements BoardsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function
   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: AUTH_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }
   getBoards = (): Promise<BoardsApiResponse> => {
      return this.networkCallWithApisauce(
         this.api,
         endpoints.boards,
         {},
         apiMethods.post
      )
   }
}
export default BoardsApiService
