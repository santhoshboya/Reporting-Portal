import { observable } from 'mobx'

import HomeTaskOverViewFieldsModel from '../HomeTaskOverViewFieldsModel'
import HomeTaskActionsModel from '../HomeTaskActionsModel'

class HomeTaskOverViewModel {
   @observable taskId!: string
   @observable taskOverViewFields: Array<HomeTaskOverViewFieldsModel>
   @observable stageWithActions

   constructor(taskObject) {
      const { task_id, task_overview_fields, stage_with_actions } = taskObject
      const { stage_id, stage_display_name, actions } = stage_with_actions
      this.taskId = task_id
      this.taskOverViewFields = task_overview_fields.map(
         taskOverViewField => new HomeTaskOverViewFieldsModel(taskOverViewField)
      )
      this.stageWithActions = {
         stageId: stage_id,
         stageDisplayName: stage_display_name,
         actions: actions.map(action => new HomeTaskActionsModel(action))
      }
   }
}

export default HomeTaskOverViewModel
