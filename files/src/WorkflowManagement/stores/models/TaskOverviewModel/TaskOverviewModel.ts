import { action, observable } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import TaskActionsApi from '../../../services/TaskActionsService'

import { TaskOverviewType } from '../../types'

import FieldModel from '../TaskOverviewField'
import TaskOverviewActionModel from '../TaskOverviewActionModel'

class TaskOverviewModel {
   id: string
   fields: Array<FieldModel>
   actions: Array<TaskOverviewActionModel>

   @observable getTaskActionsAPIStatus!: APIStatus
   @observable getTaskActionsAPIError!: Error | null

   taskActionService: TaskActionsApi
   updateColumnsOnPerfommingAction: Function
   selectedBoardId: string
   @observable selectedActionId!: null | string

   constructor(
      task: TaskOverviewType,
      taskActionsService: TaskActionsApi,
      updateColumnsOnPerfommingAction: Function,
      selectedBoardId: string
   ) {
      const { task_id, fields, actions } = task

      this.id = task_id
      this.fields = fields.map(field => new FieldModel(field))
      this.actions = actions.map(action => new TaskOverviewActionModel(action))
      this.taskActionService = taskActionsService
      this.updateColumnsOnPerfommingAction = updateColumnsOnPerfommingAction
      this.selectedBoardId = selectedBoardId
      this.init()
   }

   @action.bound
   init() {
      this.selectedActionId = null
      this.getTaskActionsAPIError = null
      this.getTaskActionsAPIStatus = API_INITIAL
   }

   @action.bound
   setSelectedActionId(id: null | string) {
      this.selectedActionId = id
   }

   @action.bound
   setGetTaskActionsAPIStatus(apiStatus) {
      this.getTaskActionsAPIStatus = apiStatus
   }

   @action.bound
   setGetTaskActionsAPIError(error) {
      this.getTaskActionsAPIError = error
   }

   @action.bound
   getTaskActionResponse(
      taskId,
      actionId,
      columnId,
      onSuccess: Function = () => {}
   ) {
      this.setSelectedActionId(actionId)
      const getActionsPromise = this.taskActionService.getTaskActionResponse({
         task_id: taskId,
         action_id: actionId,
         board_id: this.selectedBoardId
      })

      return bindPromiseWithOnSuccess(getActionsPromise)
         .to(this.setGetTaskActionsAPIStatus, response => {
            this.updateColumnsOnPerfommingAction(response, columnId, taskId)
            this.setSelectedActionId(null)
            onSuccess()
         })
         .catch(this.setGetTaskActionsAPIError)
   }
}
export default TaskOverviewModel
