import { waitFor } from '@testing-library/react'

import {
   API_INITIAL,
   API_FAILED,
   API_SUCCESS,
   API_FETCHING
} from '@ib/api-constants'

import getTasksOverviewResponse from '../../../fixtures/getTasksOverviewResponse.json'
import getTaskActionsResponse from '../../../fixtures/getTaskActionsResponse.json'
import TaskActionsApiService from '../../../services/TaskActionsService/TaskActionsAPI'

import TaskOverviewModel from '.'

const taskOverviewObject = getTasksOverviewResponse['c1'].tasks[0]
const taskActionsService = new TaskActionsApiService()

describe('TaskOverviewModel tests', () => {
   const taskOverviewModel = new TaskOverviewModel(
      taskOverviewObject,
      taskActionsService,
      () => {},
      '123'
   )

   it('should test the TaskOverviewModel initialiser', () => {
      expect(taskOverviewModel.id).toBe(taskOverviewObject.task_id)
      expect(taskOverviewModel.fields[0].value).toBe(
         taskOverviewObject.fields[0].value
      )
      expect(taskOverviewModel.getTaskActionsAPIStatus).toBe(API_INITIAL)
      expect(taskOverviewModel.getTaskActionsAPIError).toBe(null)
      expect(taskOverviewModel.fields[0].fieldType).toBe(
         taskOverviewObject.fields[0].field_type
      )
      expect(taskOverviewModel.actions[0].name).toBe(
         taskOverviewObject.actions[0].name
      )
   })

   it('should test the get task actions fetching state', () => {
      const mockLoadingPromise = new Promise(reolve => {})
      const mockGetTaskActionResponseAPI = jest.fn()
      mockGetTaskActionResponseAPI.mockResolvedValue(mockLoadingPromise)
      taskActionsService.getTaskActionResponse = mockGetTaskActionResponseAPI

      taskOverviewModel.getTaskActionResponse('taskid', 'columnId', 'actionId')

      expect(taskOverviewModel.getTaskActionsAPIStatus).toBe(API_FETCHING)
   })

   it('should test the get task actions success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(getTaskActionsResponse)
      })
      const mockGetTaskActionResponseAPI = jest.fn()
      mockGetTaskActionResponseAPI.mockResolvedValue(mockSuccessPromise)
      taskActionsService.getTaskActionResponse = mockGetTaskActionResponseAPI

      taskOverviewModel.getTaskActionResponse('t10', '20', '4')

      await waitFor(() => {
         expect(taskOverviewModel.getTaskActionsAPIStatus).toBe(API_SUCCESS)
      })
   })

   it('should test the get task actions failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => {
         reject()
      })
      const mockGetTaskActionResponseAPI = jest.fn()
      mockGetTaskActionResponseAPI.mockResolvedValue(mockFailurePromise)
      taskActionsService.getTaskActionResponse = mockGetTaskActionResponseAPI

      taskOverviewModel.getTaskActionResponse('22', 't11', '44')

      await waitFor(() => {
         expect(taskOverviewModel.getTaskActionsAPIStatus).toBe(API_FAILED)
      })
   })
})
