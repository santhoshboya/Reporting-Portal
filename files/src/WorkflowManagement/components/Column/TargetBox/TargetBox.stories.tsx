import React from 'react'

import { action } from '@storybook/addon-actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import TaskActionsApi from '../../../services/TaskActionsService/TaskActionsAPI'
import getColumnsResponse from '../../../fixtures/getColumnsResponse.json'
import TaskOverviewActionModel from '../../../stores/models/TaskOverviewActionModel'
import TaskOverviewModel from '../../../stores/models/TaskOverviewModel'
import TargetBox from '.'

export default {
   title: 'TargetBox'
}
const task = getColumnsResponse.columns[0].tasks[0]
const taskActionsApi = new TaskActionsApi()

const draggedItem = {
   task: new TaskOverviewModel(task, taskActionsApi, () => {}, '123'),
   onDrag: () => {},
   onDrop: () => {}
}

export const BasicTargetBoxonDragging = () => (
   <DndProvider backend={HTML5Backend}>
      <TargetBox
         selectedActionId={'123'}
         action={new TaskOverviewActionModel(task.actions[0])}
         changeDraggedItem={() => action('clicked close modal')}
         draggedItem={draggedItem}
      />
   </DndProvider>
)
