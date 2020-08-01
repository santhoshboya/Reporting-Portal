import getTasksOverviewResponse from '../../../fixtures/getTasksOverviewResponse.json'

import TaskOverviewField from '.'

describe('TaskOverviewField tests', () => {
   const fieldOverviewObject = getTasksOverviewResponse['c1'].tasks[0].fields[0]
   const fieldOverviewModel = new TaskOverviewField(fieldOverviewObject)
   it('should test the  TaskOverviewField initialiser', () => {
      expect(fieldOverviewObject.field_type).toBe(
         fieldOverviewObject.field_type
      )
      expect(fieldOverviewObject.key).toBe(fieldOverviewObject.key)
      expect(fieldOverviewObject.value).toBe(fieldOverviewObject.value)
   })
})
