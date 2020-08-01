import { ApisauceInstance, create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import ENV from '../../../Common/constants/EnvironmentConstants'

import { BoardsApiResponse, BoardsApiRequest } from '../../stores/types'

import endpoints from '../endpoints'

import BoardsService from '.'

const AUTH_URL = `${ENV.BASE_URL}api/ib_boards`

class BoardsApiService implements BoardsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: AUTH_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getBoards = (request: BoardsApiRequest): Promise<BoardsApiResponse> => {
      const endPoint = `${endpoints.boards}?limit=${request.limit}&offset=${request.offset}`

      return this.networkCallWithApisauce(
         this.api,
         endPoint,
         {},
         apiMethods.get
      )
   }
}

export default BoardsApiService
