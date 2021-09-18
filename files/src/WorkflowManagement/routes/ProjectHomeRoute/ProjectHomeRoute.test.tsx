import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { API_FAILED } from '@ib/api-constants'

import TaskActionsService from '../../services/TaskActionsService/TaskActionsFixture'
import HomeTasksServiceAPI from '../../services/HomeTasksService/index.fixture'
import ColumnsFixture from '../../services/ColumnsService/ColumnsFixture'
import TaskServiceFixture from '../../services/TaskService/index.fixture'
import getHomeTasksResponse from '../../fixtures/getHomeTasksResponse.json'
import HomeTasksStore from '../../stores/HomeTasksStore'
import ColumnsStore from '../../stores/ColumnsStore'
import WorkflowUiStore from '../../stores/WorkflowUiStore'
import TaskStore from '../../stores/TaskStore'
import ProjectHomeRoute from '.'

describe('Boards route tests', () => {
   let hometaskAPI,
      homeTasksStore,
      mockHomeTasksAPI,
      mockSuccessFn,
      columnsStore,
      workflowUiStore,
      taskService,
      taskStore,
      columnAPI,
      taskActionAPI

   beforeEach(() => {
      hometaskAPI = new HomeTasksServiceAPI()
      homeTasksStore = new HomeTasksStore(hometaskAPI)
      columnAPI = new ColumnsFixture()
      taskActionAPI = new TaskActionsService()
      columnsStore = new ColumnsStore(columnAPI, taskActionAPI)
      workflowUiStore = new WorkflowUiStore()
      taskService = new TaskServiceFixture(() => {})
      taskStore = new TaskStore(taskService, '')
      mockHomeTasksAPI = jest.fn()
      mockSuccessFn = jest.fn()
   })

   afterEach(() => {
      jest.restoreAllMocks()
   })

   it('should test loading state', async () => {
      const mockSuccessPromise = new Promise(() => {})
      mockHomeTasksAPI.mockReturnValue(mockSuccessPromise)
      hometaskAPI.getHomeTaskDetailsAPI = mockHomeTasksAPI

      const { getByTestId } = render(
         <Provider
            columnsStore={columnsStore}
            homeTaskStore={homeTasksStore}
            workflowUiStore={workflowUiStore}
            taskStore={taskStore}
         >
            <Router history={createMemoryHistory()}>
               <ProjectHomeRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getByTestId('loader')
      })
   })

   it('should test render success state ', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getHomeTasksResponse)
      })
      mockHomeTasksAPI.mockReturnValue(mockSuccessPromise)
      hometaskAPI.getHomeTaskDetailsAPI = mockHomeTasksAPI

      const { getByText, getByTestId, debug } = render(
         <Provider
            columnsStore={columnsStore}
            homeTaskStore={homeTasksStore}
            workflowUiStore={workflowUiStore}
            taskStore={taskStore}
         >
            <Router history={createMemoryHistory()}>
               <ProjectHomeRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         getByText('Agenda for you')
         expect(getByTestId('loader')).not.toBeInTheDocument
      })
   })

   it('should test failure state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      })
      mockHomeTasksAPI.mockReturnValue(mockSuccessPromise)
      hometaskAPI.getHomeTaskDetailsAPI = mockHomeTasksAPI

      render(
         <Provider
            columnsStore={columnsStore}
            homeTaskStore={homeTasksStore}
            workflowUiStore={workflowUiStore}
            taskStore={taskStore}
         >
            <Router history={createMemoryHistory()}>
               <ProjectHomeRoute />
            </Router>
         </Provider>
      )

      await waitFor(() => {
         expect(homeTasksStore.getHomeTaskAPIStatus).toBe(API_FAILED)
         expect(homeTasksStore.getHomeTasksAPIError).not.toBe(null)
      })
   })
})
