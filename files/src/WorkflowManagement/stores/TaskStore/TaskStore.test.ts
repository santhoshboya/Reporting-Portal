import Cookie from 'js-cookie'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import { networkCallWithAPISauceWithoutAuth } from '../../../Common/utils/APIUtils'
import TaskService from '../../services/TaskService/index.fixture'
import TaskTempleteService from '../../services/TaskTempleteService/index.fixture'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from './index'
const mockSetCookie = jest.fn()
const mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('TaskStore Tests', () => {
   let taskService
   let taskStore
   let taskTempleteService
   let taskTemplateStore

   beforeEach(() => {
      taskService = new TaskService(networkCallWithAPISauceWithoutAuth)
      taskTempleteService = new TaskTempleteService()
      taskTemplateStore = new TaskTemplateStore(taskTempleteService)
      taskStore = new TaskStore(taskService, taskTemplateStore)
   })

   it('Should test initializing the task store', () => {
      const {
         tasks,
         getCreateTaskAPIStatus,
         getCreateTaskAPIError,
         temporaryTask
      } = taskStore
      expect(getCreateTaskAPIStatus).toBe(API_INITIAL)
      expect(getCreateTaskAPIError).toBe(null)
      expect(temporaryTask).toBe(undefined)
      expect(tasks).toMatchObject({})
   })

   it('Should test create task creating state', () => {
      const mockCreatingPromise = new Promise(() => {})
      const mockCreatingApi = jest.fn()
      mockCreatingApi.mockReturnValue(mockCreatingPromise)
      taskService.createTask = mockCreatingApi
      taskStore.submitCreatedNewTask()
      expect(taskStore.getCreateTaskAPIStatus).toBe(API_FETCHING)
   })

   it('Should test create task Success', async () => {
      const mockCreatingPromise = Promise.resolve({})
      const mockCreatingApi = jest.fn()
      mockCreatingApi.mockReturnValue(mockCreatingPromise)
      taskService.createTask = mockCreatingApi
      await taskStore.submitCreatedNewTask()
      expect(taskStore.getCreateTaskAPIStatus).toBe(API_SUCCESS)
   })

   it('Should test create task failure', async () => {
      jest
         .spyOn(taskService, 'createTask')
         .mockImplementation(() => Promise.reject())

      await taskStore.submitCreatedNewTask()
      expect(taskStore.getCreateTaskAPIStatus).toBe(API_FAILED)
   })

   it('Should test for clearStore', () => {
      taskStore.clearStore()
      expect(taskStore.getCreateTaskAPIStatus).toBe(API_INITIAL)
      expect(taskStore.getCreateTaskAPIError).toBe(null)
      expect(taskStore.temporaryTask).toBe(undefined)
      expect(taskStore.tasks).toMatchObject({})
   })
})
