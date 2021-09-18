import { action } from 'mobx'
import { TaskTemplateType } from '../../types'

import GoFModel from '../GOFTemplateModel'
import ActionModel from '../ActionModel'

class TaskTempleteModel {
   templateId
   templateName
   actions
   gofs
   constructor(taskTemplateObject: TaskTemplateType) {
      const {
         template_id,
         template_name,
         actions,
         group_of_fields
      } = taskTemplateObject
      this.templateId = template_id
      this.templateName = template_name
      this.actions = actions.map(action => new ActionModel(action))
      this.gofs = group_of_fields.map(gof => new GoFModel(gof))
   }

   @action.bound
   getGof(gofId) {
      return this.gofs.find(gof => gof.gofId === gofId)
   }
}
export default TaskTempleteModel
