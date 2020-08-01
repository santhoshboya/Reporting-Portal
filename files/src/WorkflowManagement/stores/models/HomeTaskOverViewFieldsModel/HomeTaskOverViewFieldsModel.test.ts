import getHomeTasksResponse from '../../../fixtures/getHomeTasksResponse.json'
import HomeTaskActionsModel from '.'

describe('HomeTaskOverViewFields model test cases', () => {
   const homeTasksOverViewFieldsObject =
      getHomeTasksResponse.tasks[0].task_overview_fields[0]
   const homeTasksOverViewFieldsModel = new HomeTaskActionsModel(
      homeTasksOverViewFieldsObject
   )

   it('should test HomeTaskOverViewFields model is initialiser', () => {
      expect(homeTasksOverViewFieldsModel.fieldType).toBe(
         homeTasksOverViewFieldsObject.field_type
      )
      expect(homeTasksOverViewFieldsModel.fieldDisplayName).toBe(
         homeTasksOverViewFieldsObject.field_display_name
      )
      expect(homeTasksOverViewFieldsModel.fieldResponse).toBe(
         homeTasksOverViewFieldsObject.field_response
      )
   })
})
