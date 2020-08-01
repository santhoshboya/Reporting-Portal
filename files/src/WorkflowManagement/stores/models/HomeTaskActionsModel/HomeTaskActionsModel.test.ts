import getHomeTasksResponse from '../../../fixtures/getHomeTasksResponse.json'
import HomeTaskActionsModel from '.'

describe('HomeTasksActions model test cases', () => {
   const homeTasksActionsObject =
      getHomeTasksResponse.tasks[0].stage_with_actions.actions[0]
   const homeTasksActionsModel = new HomeTaskActionsModel(
      homeTasksActionsObject
   )

   it('should test HomeTasksActions model is initialiser', () => {
      expect(homeTasksActionsModel.actionId).toBe(
         homeTasksActionsObject.action_id
      )
      expect(homeTasksActionsModel.buttonText).toBe(
         homeTasksActionsObject.button_text
      )
      expect(homeTasksActionsModel.buttonColor).toBe(
         homeTasksActionsObject.button_color
      )
   })
})
