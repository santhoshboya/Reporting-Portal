import { BoardsApiResponse } from '../../stores/types'

interface BoardsService {
   getBoards(): Promise<BoardsApiResponse>
}
export default BoardsService
