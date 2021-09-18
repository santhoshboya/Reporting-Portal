import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import getColumnsResponse from '../../fixtures/getColumnsResponse.json'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'

import TaskOverview from '.'

const taskActionsApi = new TaskActionsApi()

export default {
   title: 'TaskOverview'
}

export const BasicTaskOverview = () => (
   <DndProvider backend={HTML5Backend}>
      <TaskOverview
         task={
            new TaskOverviewModel(
               getColumnsResponse.columns[0].tasks[0],
               taskActionsApi,
               () => {},
               '123'
            )
         }
         onDrop={() => action('onDrop')}
         onDrag={() => action('ondrag')}
      />
   </DndProvider>
)

BasicTaskOverview.story = {
   decorators: [withKnobs]
}
