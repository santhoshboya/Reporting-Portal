import { toJS } from 'mobx'
import { FieldType } from '../../types'

class FieldTemplateModel {
   fieldId
   displayName
   isFieldRequired
   fieldType
   fieldValues
   allowedFormatsRegex
   validation
   errorMsg
   tooltip
   placeholderText
   isFieldReadable
   isFieldWritable
   constructor(fieldObject: FieldType) {
      const {
         field_id,
         display_name,
         is_field_required,
         field_type,
         field_values,
         allowed_formats_regex,
         validation,
         error_msg,
         tooltip,
         placeholder_text,
         is_field_readable,
         is_field_writable
      } = fieldObject
      this.fieldId = field_id
      this.displayName = display_name
      this.isFieldRequired = is_field_required
      this.fieldType = field_type
      this.fieldValues = toJS(JSON.parse(field_values))
      this.allowedFormatsRegex = allowed_formats_regex
      this.validation = validation
      this.errorMsg = error_msg
      this.tooltip = tooltip
      this.placeholderText = placeholder_text
      this.isFieldReadable = is_field_readable
      this.isFieldWritable = is_field_writable
   }
}

export default FieldTemplateModel
