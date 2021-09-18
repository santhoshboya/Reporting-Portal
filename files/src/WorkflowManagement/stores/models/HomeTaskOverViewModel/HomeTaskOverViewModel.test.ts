import getHomeTasksResponse from '../../../fixtures/getHomeTasksResponse.json'
import HomeTaskOverViewFieldsModel from '../HomeTaskOverViewFieldsModel'
import HomeTaskOverViewModel from '.'

describe('HomeTaskOverView model test cases', () => {
   const homeTasksOverViewObject = getHomeTasksResponse.tasks[0]
   const homeTasksOverViewModel = new HomeTaskOverViewModel(
      homeTasksOverViewObject
   )

   it('should test HomeTaskOverView model is initialiser', () => {
      expect(homeTasksOverViewModel.taskId).toBe(
         homeTasksOverViewObject.task_id
      )

      expect(homeTasksOverViewModel.stageWithActions.stageId).toBe(
         homeTasksOverViewObject.stage_with_actions.stage_id
      )

      expect(homeTasksOverViewModel.stageWithActions.stageDisplayName).toBe(
         homeTasksOverViewObject.stage_with_actions.stage_display_name
      )
   })
})
