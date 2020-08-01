import getColumnsResponse from '../../../fixtures/getColumnsResponse.json'
import TaskActionsApiService from '../../../services/TaskActionsService/TaskActionsAPI'

import ColumnModel from '.'

const columnsObject = getColumnsResponse.columns[0]

describe('ColumnModel tests', () => {
   let mockGetTasksOverviewAPI
   let columnModel
   let taskActionsService

   beforeEach(() => {
      mockGetTasksOverviewAPI = jest.fn()
      taskActionsService = new TaskActionsApiService()

      columnModel = new ColumnModel(
         columnsObject,
         mockGetTasksOverviewAPI,
         taskActionsService,
         () => {},
         'tab1'
      )
   })
   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test the ColumnModel initialiser', () => {
      expect(columnModel.id).toBe(columnsObject.column_id)
      expect(columnModel.name).toBe(columnsObject.name)
      expect(columnModel.totalTaskCount).toBe(columnsObject.total_tasks_count)
      expect(columnModel.taskStore.tasks.length).toBe(
         columnsObject.tasks.length
      )
      expect(columnModel.initialTasks.length).toBe(columnsObject.tasks.length)
   })
})
