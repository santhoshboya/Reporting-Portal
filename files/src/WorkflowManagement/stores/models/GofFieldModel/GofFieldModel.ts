import { observable, action, computed } from 'mobx'

import { SINGLE_SELECTOR_FIELDS } from '../../../constants/FieldTypesConstants'

class GofFieldModel {
   fieldId: string
   @observable fieldResponse!: string

   constructor(gofFieldobject) {
      const { fieldId, fieldType } = gofFieldobject
      if (SINGLE_SELECTOR_FIELDS.find(each => each === fieldType))
         this.fieldResponse = ''
      else this.fieldResponse = '[]'
      this.fieldId = fieldId
   }

   @action.bound
   onChangeFieldResponse(updatedResponse): void {
      this.fieldResponse = updatedResponse
   }

   @computed
   get responseValue(): string {
      return this.fieldResponse
   }

   @action.bound
   getRequestObject(): Record<string, string> {
      return {
         field_id: this.fieldId,
         field_response: this.fieldResponse
      }
   }
}

export { GofFieldModel }
