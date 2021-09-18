import { action } from 'mobx'
import TaskModel from '../TaskModel'

class CreateTaskModel extends TaskModel {
   constructor(taskDetails) {
      super()
      this.setTaskDetails(taskDetails)
   }
   @action.bound
   onChangeTemplate(template) {
      this.setTaskDetails(template)
   }
}

export { CreateTaskModel }
