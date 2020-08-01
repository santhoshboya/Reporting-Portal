import taskDetailds from '../../../fixtures/taskTemplates.json'
import TaskTempleteModel from '../TaskTempleteModel'
import GoFModel from '../GOFTemplateModel'
import TaskModel from '.'

describe('Test TaskModel', () => {
   it('should test TaskModel setTaskDetails', () => {
      const taskModel = new TaskModel()
      taskModel.setTaskDetails(
         new TaskTempleteModel(taskDetailds.task_templates[1])
      )
      expect(taskModel.templateId).toBe(
         taskDetailds.task_templates[1].template_id
      )
   })

   it('should test addGOF', () => {
      const taskModel = new TaskModel()
      taskModel.setTaskDetails(
         new TaskTempleteModel(taskDetailds.task_templates[1])
      )
      const gofLength = taskModel.getGOFList().length

      taskModel.addGOF(
         1,
         new GoFModel(taskDetailds.task_templates[1].group_of_fields[0])
      )
      expect(taskModel.getGOFList().length).toBe(gofLength + 1)
   })

   it('should test getGOF', () => {
      const taskModel = new TaskModel()
      taskModel.setTaskDetails(
         new TaskTempleteModel(taskDetailds.task_templates[1])
      )
      const gof = taskModel.getGOF(
         taskDetailds.task_templates[1].group_of_fields[0].gof_id
      )
   })

   it('should test getGOFList', () => {
      const taskModel = new TaskModel()
      taskModel.setTaskDetails(
         new TaskTempleteModel(taskDetailds.task_templates[1])
      )

      expect(taskModel.getGOFList().length).toBe(
         taskDetailds.task_templates[1].group_of_fields.length
      )
   })
})
