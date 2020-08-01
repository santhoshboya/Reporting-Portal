import { ActionType } from '../../types'

class ActionModel {
   actionId
   buttontext
   buttonColor
   constructor(actionObject: ActionType) {
      const { action_id, button_text, button_color } = actionObject
      this.actionId = action_id
      this.buttontext = button_text
      this.buttonColor = button_color
   }
}

export default ActionModel
