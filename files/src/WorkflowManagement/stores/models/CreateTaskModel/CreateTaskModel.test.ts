import TaskTempleteModel from '../TaskTempleteModel'
import taskDetailds from '../../../fixtures/taskTemplates.json'
import CreateTaskModel from '.'
describe('Test CreateTaskModel', () => {
   it('should test CreateTaskModel onChangeTemplate', () => {
      const taskModel = new CreateTaskModel(
         new TaskTempleteModel(taskDetailds.task_templates[0])
      )
      taskModel.onChangeTemplate(
         new TaskTempleteModel(taskDetailds.task_templates[1])
      )
      expect(taskModel.templateId).toBe(
         taskDetailds.task_templates[1].template_id
      )
   })
})
