import { API_INITIAL, API_FETCHING, API_SUCCESS } from '@ib/api-constants'
import TaskServiceFixture from '../../../services/TaskService/index.fixture'
import taskDetails from '../../../fixtures/taskDetails.json'
import { networkCallWithApisauceWithAuth } from '../../../../Common/stores'
import TaskTemplateStore from '../../TaskTemplateStore'
import TaskTempleteServiceAPI from '../../../services/TaskTempleteService/index.api'
import TaskTempleteServiceFixture from '../../../services/TaskTempleteService/index.fixture'
import UpdateTaskModel from '.'

describe('Test UpdateTaskModel', () => {
   let taskModel
   let taskService
   let taskTemplateService
   let tasktemplateStore
   beforeEach(() => {
      taskService = new TaskServiceFixture(networkCallWithApisauceWithAuth)
      taskTemplateService = new TaskTempleteServiceFixture()
      tasktemplateStore = new TaskTemplateStore(taskTemplateService)
      taskModel = new UpdateTaskModel(
         'FIN_VENDOR',
         taskService,
         tasktemplateStore
      )
   })

   afterEach(() => {
      jest.clearAllMocks()
   })
   it('should test init', () => {
      const { taskAPIStatus, taskAPIError, stagesActions } = taskModel
      expect(taskAPIStatus).toBe(API_INITIAL)
      expect(taskAPIError).toBe(null)
      expect(stagesActions).toMatchObject({})
   })

   it('should test getTaskDetails fetching state', () => {
      const getTaskPromise = new Promise((resole, reject) => {})
      taskModel.getTaskDetails()
      expect(taskModel.taskAPIStatus).toBe(API_FETCHING)
   })

   it('should test getTaskDetails success state', async () => {
      const getTaskPromise = new Promise((resolve, reject) =>
         resolve(taskDetails)
      )
      const mockUpdateAPI = jest.fn()
      mockUpdateAPI.mockReturnValue(getTaskPromise)
      taskService.getTaskDetailsAPI = mockUpdateAPI
      await taskModel.getTaskDetails()
   })

   it('should test getTaskDetails failure state', async () => {
      const getTaskPromise = new Promise((resolve, reject) => reject())
      const mockUpdateAPI = jest.fn()
      mockUpdateAPI.mockReturnValue(getTaskPromise)
      taskService.getTaskDetails = mockUpdateAPI
   })

   it('should test onChangeStageId', () => {
      taskModel.onChangeStageId('1')
      expect(taskModel.selectedStageId).toBe('1')
   })

   it('should test stages', async () => {
      taskModel.setStageActions(taskDetails.stages_with_actions)
      expect(taskModel.stages.length).toBe(3)
   })

   it('should test getStageName', () => {
      taskModel.setStageActions(taskDetails.stages_with_actions)
      expect(taskModel.getStageName('PR_PAYMENT_REQUEST_DRAFTS')).toBe(
         'Payment Request Drafts'
      )
   })

   it('should test getStagesNames', () => {
      taskModel.setStageActions(taskDetails.stages_with_actions)
      expect(taskModel.getStagesNames.length).toBe(3)
   })

   it('should test stageActions', () => {
      taskModel.setStageActions(taskDetails.stages_with_actions)
      taskModel.onChangeStageId('PR_PAYMENT_REQUEST_DRAFTS')
      expect(taskModel.stageActions.length).toBe(3)
   })
})
