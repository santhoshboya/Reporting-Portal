import { observable, action, computed } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import HomeTaskOverViewModel from '../models/HomeTaskOverViewModel'
import { HomeTasksService } from '../../services/HomeTasksService/'

class HomeTasksStore {
   @observable getHomeTaskAPIStatus!: APIStatus
   @observable getHomeTasksAPIError!: Error | null
   @observable homeTasks!: Map<string, HomeTaskOverViewModel>
   @observable offset!: number
   @observable limit!: number
   totalTasks!: number
   homeTasksServiceAPI

   constructor(homeTasksServiceAPI: HomeTasksService) {
      this.homeTasksServiceAPI = homeTasksServiceAPI
      this.init()
   }

   @action.bound
   init() {
      this.getHomeTaskAPIStatus = API_INITIAL
      this.getHomeTasksAPIError = null
      this.homeTasks = new Map()
      this.limit = 30
      this.offset = 0
   }

   @action.bound
   setHomeTaskAPIStatus(apiStatus) {
      this.getHomeTaskAPIStatus = apiStatus
   }
   @action.bound
   setHomeTaskAPIResponse(response) {
      if (response) {
         response.tasks.map(task => {
            const taskModel = new HomeTaskOverViewModel(task)
            this.homeTasks.set(taskModel.taskId, taskModel)
         })

         this.totalTasks = response.total_tasks
      }
   }

   @action.bound
   setHomeTaskAPIError(error) {
      this.getHomeTasksAPIError = error
   }

   @action.bound
   getHomeTasks() {
      const requestObject = {
         offset: this.offset,
         limit: this.limit
      }
      const homeTaskAPIPromise = this.homeTasksServiceAPI.getHomeTaskDetailsAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(homeTaskAPIPromise)
         .to(this.setHomeTaskAPIStatus, this.setHomeTaskAPIResponse)
         .catch(this.setHomeTaskAPIError)
   }

   @computed
   get homeTasksArray() {
      return Array.from(this.homeTasks.values())
   }

   @action.bound
   async getMoreHomeTasks() {
      this.offset += this.limit
      await this.getHomeTasks()
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default HomeTasksStore
