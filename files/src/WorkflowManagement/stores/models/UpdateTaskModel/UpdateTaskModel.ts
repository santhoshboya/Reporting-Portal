import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import uuid from 'react-uuid'

import { TaskService } from '../../../services/TaskService'
import TaskTemplateStore from '../../TaskTemplateStore'
import StageActionsModel from '../StageActionsModel'
import TaskModel from '../TaskModel'
import GOFModel from '../GOFModel'

class UpdateTaskModel extends TaskModel {
   taskId!: string
   taskService: TaskService
   @observable taskAPIStatus!: APIStatus
   @observable taskAPIError!: Error | null
   @observable updateTaskAPIStatus!: APIStatus
   @observable updateTaskAPIError!: Error | null
   @observable selectedStageId!: string
   stagesActions!: Map<string, any>
   taskTemplateStore!: TaskTemplateStore
   constructor(taskId, taskService, taskTemplateStore) {
      super()
      this.taskId = taskId
      this.taskService = taskService
      this.taskTemplateStore = taskTemplateStore
      this.init()
   }

   @action.bound
   init() {
      this.taskAPIStatus = API_INITIAL
      this.taskAPIError = null
      this.stagesActions = new Map()
   }

   onChangeStageId(id: string) {
      this.selectedStageId = id
   }

   @action.bound
   setStageActions(stages) {
      stages.forEach(stage => {
         this.stagesActions.set(stage.stage_id, new StageActionsModel(stage))
      })
      this.selectedStageId = stages[0].stage_id
   }

   @computed
   get stages() {
      return Array.from(this.stagesActions.values())
   }

   @action.bound
   getStageName(stageId) {
      return this.stagesActions.get(stageId).stageDisplayName
   }

   @computed
   get getStagesNames() {
      return this.stages.map((stage: any) => stage.stageDisplayName)
   }

   @computed
   get stageActions() {
      return this.stagesActions.get(this.selectedStageId).actions
   }

   @action.bound
   setTaskAPIStatus(apiStatus) {
      this.taskAPIStatus = apiStatus
   }

   @action.bound
   setGofResponseDetails(gof, tempGof) {
      gof.gof_fields.forEach(eachField => {
         const field = tempGof.getField(eachField.field_id)
         field?.onChangeFieldResponse(eachField.field_response)
      })
   }

   @action.bound
   setTaskResponseData(response) {
      response.gofs.forEach(gof => {
         const tempGof = this.getGOFList().find(
            eachGof => eachGof.gofId === gof.gof_id
         )
         if (tempGof) {
            if (tempGof.sameGofOrder === 0) {
               tempGof.sameGofOrder = gof.same_gof_order
               this.setGofResponseDetails(gof, tempGof)
            } else {
               const template = this.taskTemplateStore.getTaskTemplate(
                  this.templateId
               )
               const gofTemplate = template?.getGof(gof.gof_id)
               const id = uuid()
               const newGof = new GOFModel(id, gofTemplate)
               newGof.sameGofOrder = gof.same_gof_order
               this.addGOF(id, newGof)
               this.setGofResponseDetails(gof, newGof)
            }
         }
      })
   }

   @action.bound
   setTaskAPIResponse(response: any) {
      if (response) {
         this.setStageActions(response.stages_with_actions)
         const { template_id } = response
         this.setTaskDetails(
            this.taskTemplateStore.getTaskTemplate(template_id)
         )
         this.setTaskResponseData(response)
      }
   }

   @action.bound
   setTaskAPIError(error) {
      this.taskAPIError = error
   }

   getTaskDetails() {
      const taskAPIPromise = this.taskService.getTaskDetailsAPI(this.taskId)
      return bindPromiseWithOnSuccess(taskAPIPromise)
         .to(this.setTaskAPIStatus, this.setTaskAPIResponse)
         .catch(this.setTaskAPIError)
   }

   @action.bound
   setUpdateTaskAPIStatus(apiStatus) {
      this.updateTaskAPIStatus = apiStatus
   }

   @action.bound
   setUpdateTaskAPIError(apiError) {
      this.updateTaskAPIError = apiError
   }

   @action.bound
   updateTask(updateTaskRequestObject) {
      const updateTaskPropmise = this.taskService.updateTaskAPI(
         updateTaskRequestObject
      )
      return bindPromiseWithOnSuccess(updateTaskPropmise)
         .to(this.setUpdateTaskAPIStatus, () => {})
         .catch(this.setUpdateTaskAPIError)
   }

   getRequestObject() {
      return {
         task_id: this.taskId,
         template_id: this.templateId,
         gofs: this.getGOFList().map(gof => gof.getRequestObject())
      }
   }
}

export { UpdateTaskModel }
