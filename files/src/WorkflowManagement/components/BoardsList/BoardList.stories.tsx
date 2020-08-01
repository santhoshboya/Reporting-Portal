import React, { Component } from 'react'
import { action as mobxaction, observable } from 'mobx'
import { observer } from 'mobx-react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
   boardCss,
   boardListCss
} from '../../routes/BoardsRoute/styledComponents'
import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import BoardsList from '.'

const boardsList = getBoardsListFixture.boards_details
   .slice(0, 7)
   .map(board => new BoardModel(board))

@observer
class BoardListComponent extends Component {
   @observable selectedBoardId = 'Board-1'
   @mobxaction.bound
   onClick(id: string) {
      this.selectedBoardId = id
   }
   render() {
      return (
         <BoardsList
            boardsList={boardsList}
            boardsListApiStatus={0}
            onClick={this.onClick}
            fetchMoreBoards={action('getBoards')}
            boardCss={boardCss}
            boardsListCss={boardListCss}
            height={200}
            selectedBoardId={this.selectedBoardId}
         />
      )
   }
}

storiesOf('Collapsible Sidebar/BoardsList', module)
   .add('BoardList Component', () => (
      <BoardsList
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
   .add('BoardList Component with selecting', () => <BoardListComponent />)
