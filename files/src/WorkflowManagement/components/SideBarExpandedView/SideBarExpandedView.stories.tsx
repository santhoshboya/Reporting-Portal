import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
   boardCss,
   boardListCss
} from '../../routes/BoardsRoute/styledComponents'
import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import SideBarExpandedView from '.'

const boardsList = getBoardsListFixture.boards_details
   .slice(0, 7)
   .map(board => new BoardModel(board))

storiesOf(
   'Collapsible Sidebar/BoardsList',
   module
).add('SideBarExpandedView Component', () => (
   <SideBarExpandedView
      boardsList={boardsList}
      boardsListApiStatus={0}
      onClick={action('selected')}
      fetchMoreBoards={action('getBoards')}
      boardCss={boardCss}
      boardsListCss={boardListCss}
      height={200}
      selectedBoardId={'Board-1'}
   />
))
