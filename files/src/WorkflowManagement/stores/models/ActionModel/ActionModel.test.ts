import taskTemplatesFixture from '../../../fixtures/taskTemplates.json'
import ActionModel from '.'
describe('ActionModel model test cases', () => {
   const actionObject = taskTemplatesFixture.task_templates[0].actions[0]

   const actionModel = new ActionModel(actionObject)

   it('should test ActionModel model is initialiser', () => {
      expect(actionModel.actionId).toBe(actionObject.action_id)
      expect(actionModel.buttontext).toBe(actionObject.button_text)
      expect(actionModel.buttonColor).toBe(actionObject.button_color)
   })
})
