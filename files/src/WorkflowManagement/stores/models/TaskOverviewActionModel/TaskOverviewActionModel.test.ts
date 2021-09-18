import getTasksOverviewResponse from '../../../fixtures/getTasksOverviewResponse.json'

import TaskOverviewActionModel from '.'

describe('TaskOverviewActionModel tests', () => {
   const taskId = '4543543'
   const taskOverviewActionObject =
      getTasksOverviewResponse['c1'].tasks[0].actions[0]
   const taskOverviewActionModel = new TaskOverviewActionModel(
      taskOverviewActionObject
   )

   it('should test the  TaskOverviewActionModel initialiser', () => {
      expect(taskOverviewActionModel.id).toBe(
         taskOverviewActionObject.action_id
      )
      expect(taskOverviewActionModel.name).toBe(taskOverviewActionObject.name)
      expect(taskOverviewActionModel.buttonColor).toBe(
         taskOverviewActionObject.button_color
      )
      expect(taskOverviewActionModel.buttonText).toBe(
         taskOverviewActionObject.button_text
      )
   })
})
