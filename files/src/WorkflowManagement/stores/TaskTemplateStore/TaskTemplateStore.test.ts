import Cookie from 'js-cookie'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import TaskTempleteService from '../../services/TaskTempleteService/index.fixture'
import taskTemplates from '../../fixtures/taskTemplates.json'
import TaskTemplateStore from '.'
const mockSetCookie = jest.fn()
const mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('taskTemplateStore Tests', () => {
   let taskTempleteService
   let taskTemplateStore

   beforeEach(() => {
      taskTempleteService = new TaskTempleteService()
      taskTemplateStore = new TaskTemplateStore(taskTempleteService)
   })

   it('should test initialising taskTemplateStore', () => {
      expect(taskTemplateStore.taskTemplates.size).toBe(0)
      expect(taskTemplateStore.taskTemplateAPIStatus).toBe(API_INITIAL)
      expect(taskTemplateStore.taskTemplateAPIError).toBe(null)
   })

   it('should test fetching taskTemplateStore', () => {
      const mockFetchingPromise = new Promise(() => {})
      const mockService = jest.fn()
      taskTempleteService.getTaskTemplatesAPI = mockService.mockReturnValue(
         mockFetchingPromise
      )
      taskTemplateStore.getTaskTemplates()
      expect(taskTemplateStore.taskTemplateAPIStatus).toBe(API_FETCHING)
   })
   it('should test getTaskTemplates success state', async () => {
      jest
         .spyOn(taskTempleteService, 'getTaskTemplatesAPI')
         .mockImplementation(() => Promise.resolve(taskTemplates))

      await taskTemplateStore.getTaskTemplates()
      expect(taskTemplateStore.taskTemplateAPIStatus).toBe(API_SUCCESS)
   })
   it('should test getTaskTemplates failure state', async () => {
      jest
         .spyOn(taskTempleteService, 'getTaskTemplatesAPI')
         .mockImplementation(() => Promise.reject())

      await taskTemplateStore.getTaskTemplates()
      expect(taskTemplateStore.taskTemplateAPIStatus).toBe(API_FAILED)
   })
   it('should test clearStore method in taskTemplates', () => {
      taskTemplateStore.taskTemplateAPIStatus = API_SUCCESS
      taskTemplateStore.taskTemplateAPIError = 'ERROR'
      taskTemplateStore.clearStore()
      expect(taskTemplateStore.taskTemplateAPIStatus).toBe(API_INITIAL)
      expect(taskTemplateStore.taskTemplateAPIError).toBe(null)
   })
   it('should test getTaskTemplate method', async () => {
      jest
         .spyOn(taskTempleteService, 'getTaskTemplatesAPI')
         .mockImplementation(() => Promise.resolve(taskTemplates))

      await taskTemplateStore.getTaskTemplates()
      const taskTemplatesCount = taskTemplates.task_templates.length
      expect(taskTemplateStore.taskTemplates.size).toBe(taskTemplatesCount)
      const taskTemplateId = 'FIN_VENDOR'
      const taskTemplateReceived = taskTemplateStore.getTaskTemplate(
         taskTemplateId
      )
      expect(taskTemplateReceived.templateId).toBe(taskTemplateId)
   })
})
