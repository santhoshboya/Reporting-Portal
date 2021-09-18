import { observable, action, computed } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { TaskTemplateService } from '../../services/TaskTempleteService'
import TaskTempleteModel from '../models/TaskTempleteModel'
import { TaskTemplateResponse } from '../types'

class TaskTemplateStore {
   @observable taskTemplateAPIService: TaskTemplateService
   @observable taskTemplateAPIStatus!: APIStatus
   @observable taskTemplateAPIError!: Error | null
   @observable taskTemplates!: Map<string, TaskTempleteModel>

   constructor(taskTemplateAPIService) {
      this.init()
      this.taskTemplateAPIService = taskTemplateAPIService
   }

   @action.bound
   init() {
      this.taskTemplateAPIStatus = API_INITIAL
      this.taskTemplateAPIError = null
      this.taskTemplates = new Map()
   }

   @computed get taskTemplatesCount() {
      return this.taskTemplates.size
   }

   @action.bound
   getTaskTemplate(taskTemplateId: string) {
      return this.taskTemplates.get(taskTemplateId)
   }

   @action.bound
   setTaskTemplateAPIStatus(apiStatus) {
      this.taskTemplateAPIStatus = apiStatus
   }

   @action.bound
   setTaskTemplateAPIResponse(response: TaskTemplateResponse | null) {
      response &&
         response.task_templates.forEach(taskTemplate => {
            const taskTempleteModel = new TaskTempleteModel(taskTemplate)
            this.taskTemplates.set(
               taskTempleteModel.templateId,
               taskTempleteModel
            )
         })
   }

   @action.bound
   setTaskTemplateAPIError(error) {
      this.taskTemplateAPIError = error
   }

   @action.bound
   getTaskTemplates() {
      const taskTemplateAPIPromise = this.taskTemplateAPIService.getTaskTemplatesAPI()
      return bindPromiseWithOnSuccess(taskTemplateAPIPromise)
         .to(this.setTaskTemplateAPIStatus, this.setTaskTemplateAPIResponse)
         .catch(this.setTaskTemplateAPIError)
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default TaskTemplateStore
