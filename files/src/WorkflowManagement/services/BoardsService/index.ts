import { BoardsApiResponse, BoardsApiRequest } from '../../stores/types'

interface BoardsService {
   getBoards(boardsApiRequest: BoardsApiRequest): Promise<BoardsApiResponse>
}

export default BoardsService
