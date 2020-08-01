import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import { BoardsApiResponse, BoardsApiRequest } from '../../stores/types'
import getBoardsResponse from '../../fixtures/getBoardsApiResponse.json'

import BoardsService from '.'

class BoardsServiceFixture implements BoardsService {
   getBoards(request: BoardsApiRequest): Promise<BoardsApiResponse> {
      const dataCopy = getBoardsResponse.boards_details.slice()
      const data = dataCopy.splice(request.offset, request.limit)

      const dummyData = {
         boards_details: data,
         total_boards_count: getBoardsResponse.total_boards_count
      }

      return resolveWithTimeout(dummyData)
   }
}

export default BoardsServiceFixture
