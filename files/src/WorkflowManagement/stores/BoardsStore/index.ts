import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '../../../Common/utils/MobxPromise'

import BoardsService from '../../services/BoardsService'
import { LIMIT } from '../../constants/BoardsStoreConstant'

import BoardModel from '../models/BoardModel'
import { BoardsApiResponse } from '../types'

class BoardsStore {
   boardsAPIService: BoardsService
   @observable boardsList!: Array<BoardModel>
   @observable totalBoardsCount!: number
   @observable boardsApiStatus!: APIStatus
   @observable boardsApiError!: Error | null

   constructor(boardsService: BoardsService) {
      this.boardsAPIService = boardsService
      this.init()
   }

   @action.bound
   init() {
      this.totalBoardsCount = 0
      this.boardsList = []
      this.boardsApiStatus = API_INITIAL
      this.boardsApiError = null
   }

   @computed
   get boardsCount() {
      return this.boardsList.length
   }

   @action.bound
   setBoardsAPIStatus(apiStatus: APIStatus) {
      this.boardsApiStatus = apiStatus
   }

   @action.bound
   setBoardsResponse(response: BoardsApiResponse) {
      this.totalBoardsCount = response.total_boards_count
      this.boardsList = this.boardsList.concat(
         response.boards_details.map(board => new BoardModel(board))
      )
   }

   @action.bound
   setBoardsApiError(error: any) {
      this.boardsApiError = error
   }

   @action.bound
   getBoards(onSuccess = () => {}) {
      const request = { limit: LIMIT, offset: this.boardsCount }
      const boardsServicePromise = this.boardsAPIService.getBoards(request)
      return bindPromiseWithOnSuccess(boardsServicePromise)
         .to(this.setBoardsAPIStatus, response => {
            this.setBoardsResponse(response as BoardsApiResponse)
            onSuccess()
         })
         .catch(this.setBoardsApiError)
   }

   @action.bound
   reset() {
      this.init()
   }
}

export default BoardsStore
