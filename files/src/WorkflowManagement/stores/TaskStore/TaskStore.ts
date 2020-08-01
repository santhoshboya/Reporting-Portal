import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import TaskService from '../../services/TaskService/index.api'
import CreateTaskModel from '../models/CreateTaskModel'
import UpdateTaskModel from '../models/UpdateTaskModel'
import TaskTemplateStore from '../TaskTemplateStore'

class TaskStore {
   taskService: TaskService
   @observable getCreateTaskAPIStatus!: APIStatus
   @observable getCreateTaskAPIError!: null | Error
   @observable tasks!: Map<string, any>
   temporaryTask!: CreateTaskModel
   @observable selectedTaskId!: string
   taskTemplateStore: TaskTemplateStore

   constructor(taskAPIService, taskTemplateStore) {
      this.init()
      this.taskService = taskAPIService
      this.taskTemplateStore = taskTemplateStore
   }

   @action.bound
   init() {
      this.tasks = new Map()
      this.getCreateTaskAPIStatus = API_INITIAL
      this.getCreateTaskAPIError = null
   }

   @action.bound
   onChangeSelectedTaskId(taskId) {
      this.selectedTaskId = taskId
   }

   @action.bound
   createNewTask(taskTemplate) {
      this.temporaryTask = new CreateTaskModel(taskTemplate)
   }

   @action.bound
   async getTask() {
      if (!this.tasks.has(this.selectedTaskId)) {
         const task = new UpdateTaskModel(
            this.selectedTaskId,
            this.taskService,
            this.taskTemplateStore
         )
         this.tasks.set(this.selectedTaskId, task)
         await task.getTaskDetails()
      }

      return this.tasks.get(this.selectedTaskId)
   }

   @action.bound
   getCurrentTask() {
      return this.tasks.get(this.selectedTaskId)
   }

   @action.bound
   setGetCreateTaskAPIStatus(status) {
      this.getCreateTaskAPIStatus = status
   }

   @action.bound
   UpdateSelectedTask(updateTaskRequestObject) {
      const task = this.tasks.get(this.selectedTaskId)
      task.updateTask(updateTaskRequestObject)
   }

   @action.bound
   setGetCreateTaskAPIError(error) {
      this.getCreateTaskAPIError = error
   }

   @action.bound
   submitCreatedNewTask(createTaskRequestObject) {
      const submitTask = this.taskService.createTask(createTaskRequestObject)
      return bindPromiseWithOnSuccess(submitTask)
         .to(this.setGetCreateTaskAPIStatus, () => {})
         .catch(this.setGetCreateTaskAPIError)
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export { TaskStore }
