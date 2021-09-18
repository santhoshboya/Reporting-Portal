import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import columnsResponse from '../../fixtures/getColumnsResponse.json'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'

import Task from '.'

const taskActionsApi = new TaskActionsApi()
const { tasks } = columnsResponse.columns[0]
const task = new TaskOverviewModel(tasks[0], taskActionsApi, () => {}, '123')

storiesOf('Task', module).add('with all types of fields', () => (
   <Task
      selectedTabId={'tab1'}
      onClickAction={() => {}}
      task={task}
      onClickTask={action('clicked task')}
   />
))
