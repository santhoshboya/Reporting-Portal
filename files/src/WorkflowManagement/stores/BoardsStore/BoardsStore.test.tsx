import {
   API_INITIAL,
   API_SUCCESS,
   API_FETCHING,
   API_FAILED
} from '@ib/api-constants'

import BoardsServiceFixture from '../../services/BoardsService/index.fixture'
import getBoardsResponse from '../../fixtures/getBoardsApiResponse.json'

import BoardsStore from '.'

describe('BoardsStore component test cases', () => {
   let boardsStore
   let boardsApi
   let mockSuccessFn
   let mockBoardsAPI

   beforeEach(() => {
      boardsApi = new BoardsServiceFixture()
      boardsStore = new BoardsStore(boardsApi)
      mockSuccessFn = jest.fn()
      mockBoardsAPI = jest.fn()
   })

   it('should test initializing boards store', () => {
      expect(boardsStore.boardsApiStatus).toBe(API_INITIAL)
      expect(boardsStore.boardsApiError).toBe(null)
      expect(boardsStore.boardsList).toStrictEqual([])
   })

   it('should test boardsList data fetching state', () => {
      const mockFetchingPromise = new Promise(() => {})
      mockBoardsAPI.mockReturnValue(mockFetchingPromise)
      boardsApi.getBoards = mockBoardsAPI

      boardsStore.getBoards(mockSuccessFn)

      expect(boardsStore.boardsApiStatus).toBe(API_FETCHING)
      expect(boardsStore.boardsList).toStrictEqual([])
      expect(boardsStore.boardsApiError).toBe(null)
      expect(mockSuccessFn).not.toBeCalled()
   })

   it('should test boardsList data success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getBoardsResponse)
      })
      mockBoardsAPI.mockReturnValue(mockSuccessPromise)
      boardsApi.getBoards = mockBoardsAPI

      await boardsStore.getBoards(mockSuccessFn)

      expect(boardsStore.boardsApiStatus).toBe(API_SUCCESS)
      expect(boardsStore.boardsList).not.toStrictEqual([])
      expect(boardsStore.boardsApiError).toBe(null)
      expect(mockSuccessFn).toBeCalled()
   })

   it('should test boardsList data failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      mockBoardsAPI.mockReturnValue(mockFailurePromise)
      boardsApi.getBoards = mockBoardsAPI

      await boardsStore.getBoards(mockSuccessFn)

      expect(boardsStore.boardsApiStatus).toBe(API_FAILED)
      expect(boardsStore.boardsList).toStrictEqual([])
      expect(boardsStore.boardsApiError).toBe('error')
      expect(mockSuccessFn).not.toBeCalled()
   })
})
