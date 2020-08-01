import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import SideBarExpandedView from '.'

const boardsList = getBoardsListFixture.boards_details
   .slice(0, 7)
   .map(board => new BoardModel(board))

describe('SideBarExpandedView Component test cases', () => {
   it('should test rendering elements ', () => {
      const onClick = jest.fn()
      const { getByText } = render(
         <SideBarExpandedView
            boardsList={boardsList}
            boardsListApiStatus={200}
            onClick={onClick}
            fetchMoreBoards={() => {}}
            height={200}
         />
      )

      const board = getByText(boardsList[0].name)
      fireEvent.click(board)

      expect(onClick).toBeCalledWith(boardsList[0].id)
   })
})
