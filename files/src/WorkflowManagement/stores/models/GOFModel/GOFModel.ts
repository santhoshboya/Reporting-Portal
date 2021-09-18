import { action } from 'mobx'

import GofFieldModel from '../GofFieldModel'
class GOFModel {
   uuid: string
   gofId: string
   sameGofOrder: number
   fields: Array<GofFieldModel>
   constructor(uuid, gofDetails) {
      this.uuid = uuid
      this.sameGofOrder = 0
      if (gofDetails.gofId) this.gofId = gofDetails.gofId
      else this.gofId = gofDetails.gof_id
      this.fields = gofDetails.fields?.map(field => new GofFieldModel(field))
   }

   @action.bound
   getField(id: string) {
      return this.fields.find(field => field.fieldId === id)
   }

   @action.bound
   getRequestObject() {
      return {
         gof_id: this.gofId,
         same_gof_order: this.sameGofOrder,
         gof_fields: this.fields.map(field => field.getRequestObject())
      }
   }
}

export { GOFModel }
