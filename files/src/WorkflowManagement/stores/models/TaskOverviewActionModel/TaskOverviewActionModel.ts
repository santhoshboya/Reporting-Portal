import { ActionModelType } from '../../types'

class TaskOverviewActionModel {
   id: string
   name: string
   buttonText: string
   buttonColor: string | null

   constructor(actionObj: ActionModelType) {
      this.id = actionObj.action_id
      this.name = actionObj.name
      this.buttonText = actionObj.button_text
      this.buttonColor = actionObj.button_color || null
   }
}
export default TaskOverviewActionModel
