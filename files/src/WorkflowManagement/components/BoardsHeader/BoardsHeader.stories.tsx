import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import BoardsHeader from './BoardsHeader'

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

storiesOf('Boards Header', module)
   .add('default View', () => (
      <BoardsHeader
         projectName={'Project Thanos'}
         setSelectedBoard={action('set Selected board')}
         boardList={options}
         selectedBoard={{ value: 'vanilla', label: 'Vanilla' }}
      />
   ))

   .add('Board Selected View', () => (
      <BoardsHeader
         projectName={'Project Thanos'}
         shouldShowBoardsDropDown={true}
         selectedBoard={{ value: 'vanilla', label: 'Vanilla' }}
         setSelectedBoard={action('set Selected board')}
         boardList={options}
      />
   ))
