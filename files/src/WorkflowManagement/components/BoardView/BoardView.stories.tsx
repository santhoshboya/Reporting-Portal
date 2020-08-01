import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import getBoardsListFixture from '../../fixtures/getBoardsApiResponse.json'
import BoardModel from '../../stores/models/BoardModel'

import BoardView from '.'

const board = new BoardModel(getBoardsListFixture.boards_details[0])

storiesOf('Collapsible Sidebar/BoardsList', module).add(
   'BoardView Component',
   () => <BoardView board={board} onClick={action('Selected')} />
)
