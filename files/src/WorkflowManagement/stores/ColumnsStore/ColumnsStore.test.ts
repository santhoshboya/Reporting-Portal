import React from 'react'
import { waitFor } from '@testing-library/react'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import ColumnsAPI from '../../services/ColumnsService/ColumnsFixture'
import ColumnsService from '../../services/ColumnsService'
import TaskActionsService from '../../services/TaskActionsService'

import getColumnsResponse from '../../fixtures/getColumnsResponse.json'
import TaskActionsApiService from '../../services/TaskActionsService/TaskActionsAPI'

import ColumnsStore from '.'

describe('ColumnsStore tests', () => {
   let columnsStore: ColumnsStore
   let columnsAPI: ColumnsService
   let taskActionsService: TaskActionsService

   beforeEach(() => {
      columnsAPI = new ColumnsAPI()
      taskActionsService = new TaskActionsApiService()
      columnsStore = new ColumnsStore(columnsAPI, taskActionsService)
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should initialse the store', () => {
      expect(columnsStore.getColumnsAPIStatus).toBe(API_INITIAL)
      expect(columnsStore.getColumnsAPIError).toBe(null)
      expect(columnsStore.columns.length).toEqual(0)
   })
   it('should test the getColumns fetching state', () => {
      const mockLoadingPromise = new Promise(_ => {})
      const mockGetColumnsAPI = jest.fn()
      mockGetColumnsAPI.mockResolvedValue(mockLoadingPromise)
      columnsAPI.getColumns = mockGetColumnsAPI

      columnsStore.getColumns()

      expect(columnsStore.getColumnsAPIStatus).toBe(API_FETCHING)
   })

   it('should test the getColumns success state', async () => {
      const mockSuccessPromise = new Promise(resolve => {
         resolve(getColumnsResponse)
      })
      const mockGetColumnsAPI = jest.fn()
      mockGetColumnsAPI.mockResolvedValue(mockSuccessPromise)
      columnsAPI.getColumns = mockGetColumnsAPI

      columnsStore.getColumns()

      await waitFor(() => {
         expect(columnsStore.getColumnsAPIStatus).toBe(API_SUCCESS)
         expect(columnsStore.columns.length).not.toEqual(0)
      })
   })

   it('should test the getColumns failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject()
      })
      const mockGetColumnsAPI = jest.fn()
      mockGetColumnsAPI.mockResolvedValue(mockFailurePromise)
      columnsAPI.getColumns = mockGetColumnsAPI

      columnsStore.getColumns()

      await waitFor(() => {
         expect(columnsStore.getColumnsAPIStatus).toBe(API_FAILED)
         expect(columnsStore.columns.length).toEqual(0)
      })
   })

   it('should clear the store', () => {
      const mockInit = jest.fn()
      columnsStore.init = mockInit
      columnsStore.clearStore()
      expect(mockInit).toBeCalled()
   })
})
