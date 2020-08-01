import { BoardType } from '../../types'

class BoardModel {
   id: string
   name: string

   constructor(Board: BoardType) {
      this.id = Board.board_id
      this.name = Board.name
   }
}

export default BoardModel
