import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import BoardView from '.'

const board = new BoardModel(getBoardsListFixture.boards_details[0])

describe('BoardView Component test cases', () => {
   it('should render details', () => {
      const { getByText, queryByText } = render(
         <BoardView board={board} onClick={() => {}} />
      )

      getByText(getBoardsListFixture.boards_details[0].name)
   })
   it('should test onClick', () => {
      const mockOnClickFn = jest.fn()
      const { getByText, getByTestId, queryByText } = render(
         <BoardView board={board} onClick={mockOnClickFn} />
      )
      const boardView = getByTestId('Board-1')

      getByText(getBoardsListFixture.boards_details[0].name)
      fireEvent.click(boardView)

      expect(mockOnClickFn).toBeCalledWith(
         getBoardsListFixture.boards_details[0].board_id
      )
   })
})
