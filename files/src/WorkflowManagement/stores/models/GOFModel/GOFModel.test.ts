import taskDetails from '../../../fixtures/taskDetails.json'
import GOFModel from '.'

describe('test GOFModel', () => {
   it('should test GOFModel init', () => {
      const gofModel = new GOFModel('1', taskDetails.gofs[0])
      expect(gofModel.gofId).toBe(taskDetails.gofs[0].gof_id)
      expect(gofModel.fields.length).toBe(taskDetails.gofs[0].gof_fields.length)
   })
   it('should test getField', () => {
      const gofModel = new GOFModel('1', taskDetails.gofs[0])
      const field = gofModel.getField(
         taskDetails.gofs[0].gof_fields[0].field_id
      )
      expect(field?.fieldId).toBe(taskDetails.gofs[0].gof_fields[0].field_id)
   })
   it('should test getRequestObject', () => {
      const gofModel = new GOFModel('1', taskDetails.gofs[0])
      const requestObject = gofModel.getRequestObject()
      expect(requestObject.gof_fields.length).toBe(gofModel.fields.length)
   })
})
