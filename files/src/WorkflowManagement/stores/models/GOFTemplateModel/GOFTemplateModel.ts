import { action } from 'mobx'
import { GOFType } from '../../types'

import FieldModel from '../FieldTemplateModel'

class GOFTemplateModel {
   gofId
   gofDisplayName
   maxColumns
   order
   enableAddAnother
   isGofReadable
   isGofWritable
   fields
   constructor(gofObject: GOFType) {
      const {
         gof_id,
         gof_display_name,
         max_columns,
         order,
         enable_add_another,
         fields
      } = gofObject
      this.gofId = gof_id
      this.gofDisplayName = gof_display_name
      this.maxColumns = max_columns
      this.order = order
      this.enableAddAnother = enable_add_another
      this.fields = fields.map(field => new FieldModel(field))
   }

   @action.bound
   getField(fieldId) {
      return this.fields.find(field => field.fieldId === fieldId)
   }
}

export default GOFTemplateModel
