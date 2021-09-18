import { observable } from 'mobx'
import TaskActionsApi from '../../../services/TaskActionsService'
import TaskOverviewStore from '../../TaskOverviewStore'
import { ColumnType, getTasksOverviewType } from '../../types'

import TaskOverviewModel from '../TaskOverviewModel'

class ColumnModel {
   id: string
   name: string
   totalTaskCount: number
   initialTasks: Array<TaskOverviewModel>
   @observable taskStore!: TaskOverviewStore
   getTasksOverviewAPI: getTasksOverviewType
   taskActionService: TaskActionsApi
   updateColumnsOnPerfommingAction: Function
   selectedBoardId: string
   constructor(
      column: ColumnType,
      getTasksOverviewAPI: getTasksOverviewType,
      taskActionsService: TaskActionsApi,
      updateColumnsOnPerfommingAction: Function,
      selectedBoardId: string
   ) {
      this.taskActionService = taskActionsService
      this.updateColumnsOnPerfommingAction = updateColumnsOnPerfommingAction
      const { column_id, name, total_tasks_count, tasks } = column
      this.id = column_id
      this.name = name
      this.totalTaskCount = total_tasks_count
      this.initialTasks = tasks.map(
         task =>
            new TaskOverviewModel(
               task,
               this.taskActionService,
               this.updateColumnsOnPerfommingAction,
               this.selectedBoardId
            )
      )
      this.getTasksOverviewAPI = getTasksOverviewAPI
      this.selectedBoardId = selectedBoardId
      this.init()
   }
   init = () => {
      const taskStoreProps = {
         getTasksOverviewAPI: this.getTasksOverviewAPI,
         columnId: this.id,
         initialTasks: this.initialTasks
      }
      this.taskStore = new TaskOverviewStore(
         taskStoreProps,
         this.totalTaskCount,
         this.taskActionService,
         this.updateColumnsOnPerfommingAction,
         this.selectedBoardId
      )
   }
}
export default ColumnModel
