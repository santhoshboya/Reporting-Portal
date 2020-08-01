import getBoardsResponseFixture from '../../../fixtures/getBoardsApiResponse.json'

import BoardModel from '.'

describe('BoardModel test cases', () => {
   const boardObject = getBoardsResponseFixture.boards_details[0]

   const boardModel = new BoardModel(boardObject)

   it('should test BoardModel model', () => {
      expect(boardModel.id).toBe(boardObject.board_id)
      expect(boardModel.name).toBe(boardObject.name)
   })
})
