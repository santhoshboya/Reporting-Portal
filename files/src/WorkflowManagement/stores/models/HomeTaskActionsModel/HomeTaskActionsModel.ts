import { observable } from 'mobx'

class HomeTaskActionsModel {
   @observable actionId: string
   @observable buttonText: string
   @observable buttonColor: string

   constructor(action) {
      this.actionId = action.action_id
      this.buttonText = action.button_text
      this.buttonColor = action.button_color
   }
}

export default HomeTaskActionsModel
