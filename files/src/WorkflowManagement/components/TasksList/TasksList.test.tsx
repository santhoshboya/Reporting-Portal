import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import tasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'
import ColumnsService from '../../services/ColumnsService/ColumnsFixture'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import TaskOverviewStore from '../../stores/TaskOverviewStore'

import TasksList from '.'

const taskActionsApi = new TaskActionsApi()

describe('TasksList tests', () => {
   let taskStore
   let config
   let tableHeadings
   let onClickTask
   beforeEach(() => {
      config = {
         getTasksOverviewAPI: new ColumnsService().getTasksOverview,
         columnId: 'c1',
         initialTasks: tasksOverviewResponse.c1.tasks.map(
            task => new TaskOverviewModel(task, taskActionsApi, () => {}, '123')
         )
      }
      const { total_tasks_count: totalTasksCount } = tasksOverviewResponse.c1
      taskStore = new TaskOverviewStore(
         config,
         totalTasksCount,
         taskActionsApi,
         () => {},
         '123'
      )
      tableHeadings = ['Task Id', 'Assignee Name', 'Assignee', 'Task Data']
      onClickTask = jest.fn()
   })
   it('should test if tasks list is being displayed', () => {
      const { queryAllByTestId } = render(
         <TasksList
            selectedTabId={'tab1'}
            taskStore={taskStore}
            taskFieldsHeadings={tableHeadings}
            onClickTask={onClickTask}
         />
      )

      fireEvent.click(queryAllByTestId('task')[0])

      expect(queryAllByTestId('task')).toHaveLength(7)
      expect(onClickTask).toHaveBeenCalledWith(taskStore.tasks[0].id)
   })
})
