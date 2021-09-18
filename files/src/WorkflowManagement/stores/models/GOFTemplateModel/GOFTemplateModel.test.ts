import taskTemplatesFixture from '../../../fixtures/taskTemplates.json'
import GoFModel from '.'

describe('GoFModel model test cases', () => {
   const gofObject = taskTemplatesFixture.task_templates[0].group_of_fields[0]
   const gofModel = new GoFModel(gofObject)

   it('should test goFModel model is initialiser', () => {
      expect(gofModel.gofId).toBe(gofObject.gof_id)
      expect(gofModel.gofDisplayName).toBe(gofObject.gof_display_name)
      expect(gofModel.maxColumns).toBe(gofObject.max_columns)
      expect(gofModel.order).toBe(gofObject.order)
      expect(gofModel.enableAddAnother).toBe(gofObject.enable_add_another)
      expect(gofModel.fields.length).toBe(gofObject.fields.length)
   })
   it('should test getField method', () => {
      const requiredField = gofObject.fields[0]
      const receivedField = gofModel.getField(requiredField.field_id)
      expect(receivedField.fieldId).toBe(requiredField.field_id)
   })
})
