import taskTemplateFixture from '../../../fixtures/taskTemplates.json'
import TaskTempleteModel from '.'
describe('TaskTempleteModel model test cases', () => {
   const taskTemplateObject = taskTemplateFixture.task_templates[0]
   const taskTempleteModel = new TaskTempleteModel(taskTemplateObject)

   it('should test taskTempleteModel model is initialiser', () => {
      expect(taskTempleteModel.templateId).toBe(taskTemplateObject.template_id)
      expect(taskTempleteModel.templateName).toBe(
         taskTemplateObject.template_name
      )
      expect(taskTempleteModel.actions.length).toBe(
         taskTemplateObject.actions.length
      )
      expect(taskTempleteModel.gofs.length).toBe(
         taskTemplateObject.group_of_fields.length
      )
   })
   it('should test getGof method', () => {
      const requiredGof = taskTemplateObject.group_of_fields[0]
      const receivedGof = taskTempleteModel.getGof(requiredGof.gof_id)
      expect(receivedGof.gofId).toBe(requiredGof.gof_id)
   })
})
