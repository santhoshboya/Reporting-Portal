import { observable } from 'mobx'

class HomeTaskOverViewFieldsModel {
   @observable fieldType!: string
   @observable fieldDisplayName!: string
   @observable fieldResponse!: string

   constructor(taskOverViewField) {
      this.fieldType = taskOverViewField.field_type
      this.fieldDisplayName = taskOverViewField.field_display_name
      this.fieldResponse = taskOverViewField.field_response
   }
}

export default HomeTaskOverViewFieldsModel
