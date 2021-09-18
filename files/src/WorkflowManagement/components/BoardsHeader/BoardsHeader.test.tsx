import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import WorkflowUiStore from '../../stores/WorkflowUiStore'
import BoardsHeader from '.'

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const workflowUiStore = new WorkflowUiStore()

describe('BoardsHeader Component Test cases', () => {
   it('Should Test render header', () => {
      const { getByText, queryByText } = render(
         <Provider workflowUiStore={workflowUiStore}>
            <Router history={createMemoryHistory()}>
               <BoardsHeader
                  projectName={'Project Thanos'}
                  setSelectedBoard={() => {}}
                  boardList={options}
               />
            </Router>
         </Provider>
      )

      getByText('Create New')
      getByText('Project Thanos')
   })

   it('Should Test render Board Name', () => {
      const changeSelectedBoard = jest.fn()
      const { getByText } = render(
         <Provider workflowUiStore={workflowUiStore}>
            <Router history={createMemoryHistory()}>
               <BoardsHeader
                  projectName={'Project Thanos'}
                  setSelectedBoard={changeSelectedBoard}
                  boardList={options}
                  selectedBoard={{ value: 'vanilla', label: 'Vanilla' }}
                  shouldShowBoardsDropDown={true}
               />
            </Router>
         </Provider>
      )

      getByText('Create New')
      getByText('Project Thanos')
      getByText('Vanilla')
   })

   it('Should Test change Board Name', async () => {
      const changeSelectedBoard = jest.fn()
      const { getByText, debug } = render(
         <Provider workflowUiStore={workflowUiStore}>
            <Router history={createMemoryHistory()}>
               <BoardsHeader
                  projectName={'Project Thanos'}
                  setSelectedBoard={changeSelectedBoard}
                  boardList={options}
                  selectedBoard={{ value: 'chocolate', label: 'Chocolate' }}
                  shouldShowBoardsDropDown={true}
               />
            </Router>
         </Provider>
      )

      fireEvent.focus(getByText('Chocolate'))
      fireEvent.keyDown(getByText('Chocolate'), {
         key: 'ArrowDown',
         code: 40
      })
      fireEvent.click(getByText('Strawberry'))

      expect(changeSelectedBoard).toBeCalled()
   })
})
