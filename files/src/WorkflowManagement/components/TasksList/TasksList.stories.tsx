import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import tasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'
import ColumnsService from '../../services/ColumnsService/ColumnsFixture'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import TaskOverviewStore from '../../stores/TaskOverviewStore'

import TasksList from '.'

const taskActionsApi = new TaskActionsApi()
const config = {
   getTasksOverviewAPI: new ColumnsService().getTasksOverview,
   columnId: 'c1',
   initialTasks: tasksOverviewResponse.c1.tasks.map(
      task => new TaskOverviewModel(task, taskActionsApi, () => {}, '123')
   )
}
const { total_tasks_count: totalTasksCount } = tasksOverviewResponse.c1
const taskStore = new TaskOverviewStore(
   config,
   totalTasksCount,
   taskActionsApi,
   () => {},
   '123'
)
const tableHeadings = ['Task Id', 'Assignee Name', 'Assignee', 'Task Data']

storiesOf('TasksList', module).add('With all props view', () => (
   <TasksList
      selectedTabId={'tab1'}
      taskStore={taskStore}
      onClickTask={action('clicked task')}
      taskFieldsHeadings={tableHeadings}
   />
))
