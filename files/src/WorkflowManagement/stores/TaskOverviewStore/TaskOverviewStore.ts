import { observable, action, computed } from 'mobx'

import { API_INITIAL, API_SUCCESS } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import TaskActionsApi from '../../services/TaskActionsService'

import {
   TASK_LIMIT,
   PAGINATION_TASKS_LIMIT
} from '../../constants/ColumnConstants'

import TaskOverviewModel from '../models/TaskOverviewModel'

interface TaskOverviewStoreConfigType {
   getTasksOverviewAPI: Function
   columnId: string
   initialTasks: Array<TaskOverviewModel>
}

class TaskOverviewStore {
   @observable getTasksAPIStatus!: number
   @observable getTasksAPIError!: Error | null

   @observable tasks: Array<TaskOverviewModel>
   @observable totalTasks!: number

   @observable currentPage!: number
   @observable hasPagination!: boolean

   columnId: string
   getTasksOverviewAPI: Function

   taskActionService: TaskActionsApi
   updateColumnsOnPerfommingAction: Function
   selectedBoardId: string
   @observable selectedActionId!: null | string

   constructor(
      config: TaskOverviewStoreConfigType,
      tasksCount,
      taskActionService: TaskActionsApi,
      updateColumnsOnPerfommingAction: Function,
      selectedBoardId: string
   ) {
      this.columnId = config.columnId
      this.getTasksOverviewAPI = config.getTasksOverviewAPI
      this.tasks = config.initialTasks
      this.totalTasks = tasksCount
      this.currentPage = 1
      this.taskActionService = taskActionService
      this.updateColumnsOnPerfommingAction = updateColumnsOnPerfommingAction
      this.selectedBoardId = selectedBoardId
      this.init()
   }
   @action.bound
   init() {
      this.selectedActionId = null
      this.getTasksAPIStatus = API_SUCCESS
      this.getTasksAPIError = null
      this.hasPagination = true
      this.updatePagination()
   }

   @computed
   get tasksLength() {
      return this.tasks.length
   }

   @computed
   get hasMoreTasks() {
      return this.hasPagination
   }

   @action.bound
   setSelectedActionId(id: null | string) {
      this.selectedActionId = id
   }

   initialiseTasksList = () => {
      this.tasks = this.tasks.slice(0, this.tasksLength)
   }

   updatePagination = () => {
      if (this.tasks.length === this.totalTasks) this.hasPagination = false
   }

   @action.bound
   setCurrentPageNumber(value: number): void {
      this.currentPage = value
   }

   @action.bound
   sliceInitialTasksToPaginationLimit() {
      this.tasks = this.tasks.slice(0, PAGINATION_TASKS_LIMIT)
   }

   @action.bound
   setGetTasksApiStatus(status) {
      this.getTasksAPIStatus = status
   }

   @action.bound
   setGetTasksAPIError(error) {
      this.getTasksAPIError = error
   }

   @action.bound
   setGetTasksApiResponse(response) {
      const { total_tasks_count, tasks } = response
      this.totalTasks = total_tasks_count
      const newTasks = tasks.map(
         task =>
            new TaskOverviewModel(
               task,
               this.taskActionService,
               this.updateColumnsOnPerfommingAction,
               this.selectedBoardId
            )
      )
      this.tasks = this.tasks.concat(newTasks)
      this.updatePagination()
   }

   @action.bound
   getTasks(isPagination = false) {
      let requestObject
      if (isPagination) {
         requestObject = {
            limit: PAGINATION_TASKS_LIMIT,
            offset: (this.currentPage - 1) * PAGINATION_TASKS_LIMIT,
            columnId: this.columnId
         }
         this.initialiseTasksList()
      } else {
         requestObject = {
            limit: TASK_LIMIT,
            offset: this.tasksLength,
            columnId: this.columnId
         }
      }
      this.setGetTasksApiStatus(API_INITIAL)
      const getTasksPromise = this.getTasksOverviewAPI(requestObject)
      return bindPromiseWithOnSuccess(getTasksPromise)
         .to(this.setGetTasksApiStatus, this.setGetTasksApiResponse)
         .catch(this.setGetTasksAPIError)
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
export default TaskOverviewStore
