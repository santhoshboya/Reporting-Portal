import React from 'react'
import { API_FAILED } from '@ib/api-constants'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import UserProfileDetailsStore from '../../../UserProfile/stores/UserProfileDetailsStore/UserProfileDetailsStore'

import ColumnsStore from '../../stores/ColumnsStore'
import BoardsStore from '../../stores/BoardsStore'
import WorkflowUiStore from '../../stores/WorkflowUiStore'
import BoardsServiceFixture from '../../services/BoardsService/index.fixture'
import UserProfileDetailsFixture from '../../../UserProfile/services/UserProfileDetailsService/index.fixture'
import ColumnsFixture from '../../services/ColumnsService/ColumnsFixture'
import TaskActionsService from '../../services/TaskActionsService/TaskActionsFixture'
import getBoardsResponse from '../../fixtures/getBoardsApiResponse.json'
import getColumnsResponse from '../../fixtures/getColumnsResponse.json'

import BoardsRoute from '.'

const columns = getColumnsResponse.columns

describe('Boards route tests', () => {
   let boardAPI
   let boardsStore
   let columnsStore
   let columnAPI
   let mockBoardsAPI
   let mockSuccessFn
   let taskActionAPI
   let userProfileDetailsAPI
   let userProfileDetailsStore
   let workflowUiStore

   beforeEach(() => {
      boardAPI = new BoardsServiceFixture()
      boardsStore = new BoardsStore(boardAPI)
      columnAPI = new ColumnsFixture()
      taskActionAPI = new TaskActionsService()
      columnsStore = new ColumnsStore(columnAPI, taskActionAPI)
      const UserProfileDetailsFixtureFn = jest.fn
      userProfileDetailsAPI = new UserProfileDetailsFixture(
         UserProfileDetailsFixtureFn
      )
      userProfileDetailsStore = new UserProfileDetailsStore(
         userProfileDetailsAPI
      )
      workflowUiStore = new WorkflowUiStore()
      mockBoardsAPI = jest.fn()
      mockSuccessFn = jest.fn()
   })

   afterEach(() => {
      jest.restoreAllMocks()
   })

   it('should test loading state', async () => {
      const mockSuccessPromise = new Promise(() => {})
      mockBoardsAPI.mockReturnValue(mockSuccessPromise)
      boardAPI.getBoards = mockBoardsAPI

      const { getByTestId } = render(
         <Provider
            boardsStore={boardsStore}
            columnsStore={columnsStore}
            userProfileDetailsStore={userProfileDetailsStore}
            workflowUiStore={workflowUiStore}
         >
            <Router history={createMemoryHistory()}>
               <BoardsRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getByTestId('loader')
      })
   })

   it('should test render success state ', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getBoardsResponse)
      })
      mockBoardsAPI.mockReturnValue(mockSuccessPromise)
      boardAPI.getBoards = mockBoardsAPI

      const { getByText, getByTestId } = render(
         <Provider
            boardsStore={boardsStore}
            columnsStore={columnsStore}
            userProfileDetailsStore={userProfileDetailsStore}
            workflowUiStore={workflowUiStore}
         >
            <Router history={createMemoryHistory()}>
               <BoardsRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getByTestId('Board-1')
         getByText(columns[0].name)
         getByText(columns[1].name)
         getByText(columns[2].name)
         getByText(columns[3].name)
      })
   })

   it('should test failure state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      mockBoardsAPI.mockReturnValue(mockSuccessPromise)
      boardAPI.getBoards = mockBoardsAPI

      render(
         <Provider
            boardsStore={boardsStore}
            columnsStore={columnsStore}
            userProfileDetailsStore={userProfileDetailsStore}
            workflowUiStore={workflowUiStore}
         >
            <Router history={createMemoryHistory()}>
               <BoardsRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         //TODO:Based on "Retry" text need to write assertive statement
         expect(boardsStore.boardsApiStatus).toBe(API_FAILED)
         expect(boardsStore.boardsApiError).not.toBe(null)
      })
   })

   it('should test onclick board', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getBoardsResponse)
      })
      mockBoardsAPI.mockReturnValue(mockSuccessPromise)
      boardAPI.getBoards = mockBoardsAPI

      const { getByTestId } = render(
         <Provider
            boardsStore={boardsStore}
            columnsStore={columnsStore}
            userProfileDetailsStore={userProfileDetailsStore}
            workflowUiStore={workflowUiStore}
         >
            <Router history={createMemoryHistory()}>
               <BoardsRoute />
            </Router>
         </Provider>
      )

      let board
      await waitFor(() => {
         board = getByTestId('Board-3')
      })
      fireEvent.click(board)

      expect(columnsStore.selectedBoardId).toBe('Board-3')
   })

   //FIXME:Testcase for third party library infinite scroll
})
