import React from 'react'
import { waitFor } from '@testing-library/react'

import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getTasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import TaskOverviewStore from '.'

const initialTasks = [
   {
      id: 't1',
      fields: [
         {
            fieldType: 'TEXT',
            key: 'name',
            value: 'Rajesh'
         },
         {
            fieldType: 'IMAGE',
            key: 'profile',
            value:
               'https://cdn.zeplin.io/5efacaf3a9674a242eb8fb11/assets/b0327418-1a42-48db-bc5f-ffaccc840475@3x.png'
         },
         {
            fieldType: 'TEXT',
            key: 'company',
            value: 'ProYuga'
         }
      ],
      actions: [
         {
            id: '124',
            name: 'Confirm',
            buttonText: 'Confirm',
            buttonColor: 'blue'
         },
         {
            id: '164',
            name: 'Delete',
            buttonText: 'Delete',
            buttonColor: 'red'
         }
      ]
   },
   {
      id: 't2',
      fields: [
         {
            fieldType: 'TEXT',
            key: 'name',
            value: 'Rajesh'
         },
         {
            fieldType: 'IMAGE',
            key: 'profile',
            value:
               'https://cdn.zeplin.io/5efacaf3a9674a242eb8fb11/assets/b0327418-1a42-48db-bc5f-ffaccc840475@3x.png'
         },
         {
            fieldType: 'TEXT',
            key: 'company',
            value: 'ProYuga'
         }
      ],
      actions: [
         {
            id: '14',
            name: 'Confirm',
            buttonText: 'Confirm',
            buttonColor: 'blue'
         },
         {
            id: '16',
            name: 'Delete',
            buttonText: 'Delete',
            buttonColor: 'red'
         }
      ]
   }
]

const taskActionsApi = new TaskActionsApi()
describe('TaskOverViewStore  tests', () => {
   let taskOverviewStore
   let mockTaskOverviewFetchingAPI
   let config

   beforeEach(() => {
      mockTaskOverviewFetchingAPI = jest.fn()
      config = {
         getTasksOverviewAPI: mockTaskOverviewFetchingAPI,
         columnId: 1,
         initialTasks: initialTasks
      }
      const updateColumnsOnPerfommingAction = jest.fn()
      taskOverviewStore = new TaskOverviewStore(
         config,
         10,
         taskActionsApi,
         updateColumnsOnPerfommingAction,
         '123'
      )
   })
   afterEach(() => {
      jest.resetAllMocks()
   })
   it('should test taskOverviewStore  initialization', () => {
      expect(taskOverviewStore.getTasksAPIStatus).toBe(API_SUCCESS)
      expect(taskOverviewStore.getTasksAPIError).toBe(null)
   })
   it('should test fetching state of getTasks', async () => {
      const mockLoadingPromise = new Promise(_ => {})
      mockTaskOverviewFetchingAPI.mockReturnValue(mockLoadingPromise)
      taskOverviewStore.getTasks()
      await waitFor(() => {
         expect(taskOverviewStore.getTasksAPIStatus).toBe(API_FETCHING)
      })
   })
   it('should test success state of getTasks', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) =>
         resolve(getTasksOverviewResponse['c1'])
      )
      mockTaskOverviewFetchingAPI.mockReturnValue(mockSuccessPromise)

      taskOverviewStore.getTasks()
      await waitFor(() => {
         expect(taskOverviewStore.getTasksAPIStatus).toBe(API_SUCCESS)
      })
   })
   it('should test failure state of getTasks', async () => {
      const mockSuccessPromise = new Promise((_, reject) => reject())
      mockTaskOverviewFetchingAPI.mockReturnValue(mockSuccessPromise)

      taskOverviewStore.getTasks()
      await waitFor(() => {
         expect(taskOverviewStore.getTasksAPIStatus).toBe(API_FAILED)
      })
   })

   it('Should test the clearing the store', () => {
      const mockInit = jest.fn()
      taskOverviewStore.init = mockInit
      taskOverviewStore.clearStore()
      expect(mockInit).toBeCalled()
   })
})
