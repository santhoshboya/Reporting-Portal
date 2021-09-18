import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import BoardsList from '.'

const boardsList = getBoardsListFixture.boards_details
   .slice(0, 7)
   .map(board => new BoardModel(board))

describe('BordersList component test cases', () => {
   it('should test onclick board ', () => {
      const onClick = jest.fn()
      const { getByText } = render(
         <BoardsList
            boardsList={boardsList}
            onClick={onClick}
            fetchMoreBoards={() => {}}
            height={200}
         />
      )
      const board = getByText(boardsList[0].name)

      fireEvent.click(board)

      expect(onClick).toBeCalledWith(boardsList[0].id)
   })

   //TODO:Need to give data test id to scroll container third party library
})
