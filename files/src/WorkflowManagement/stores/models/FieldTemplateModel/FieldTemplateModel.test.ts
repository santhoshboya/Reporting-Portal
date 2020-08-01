import taskTemplatesFixture from '../../../fixtures/taskTemplates.json'
import FieldModel from '.'

describe('FieldModel model test cases', () => {
   const fieldObject =
      taskTemplatesFixture.task_templates[0].group_of_fields[0].fields[0]
   const fieldModel = new FieldModel(fieldObject)

   it('should test fieldModel model is initialiser', () => {
      expect(fieldModel.fieldId).toBe(fieldObject.field_id)
      expect(fieldModel.displayName).toBe(fieldObject.display_name)
      expect(fieldModel.isFieldRequired).toBe(fieldObject.is_field_required)
      expect(fieldModel.fieldType).toBe(fieldObject.field_type)
      expect(fieldModel.allowedFormatsRegex).toBe(
         fieldObject.allowed_formats_regex
      )
      expect(fieldModel.validation).toBe(fieldObject.validation)
      expect(fieldModel.errorMsg).toBe(fieldObject.error_msg)
      expect(fieldModel.tooltip).toBe(fieldObject.tooltip)
      expect(fieldModel.placeholderText).toBe(fieldObject.placeholder_text)
      expect(fieldModel.isFieldReadable).toBe(fieldObject.is_field_readable)
      expect(fieldModel.isFieldWritable).toBe(fieldObject.is_field_writable)
   })
})
