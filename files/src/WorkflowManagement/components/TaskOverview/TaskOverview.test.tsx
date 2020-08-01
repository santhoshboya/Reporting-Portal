import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import getTasksOverviewResponse from '../../fixtures/getTasksOverviewResponse.json'

const tasks = getTasksOverviewResponse['c1'].tasks

const taskActionsApi = new TaskActionsApi()
const task = new TaskOverviewModel(tasks[0], taskActionsApi, () => {}, '123')

import TaskOverview from '.'

/*global expect,jest*/

describe('taskOverview testcases', () => {
   it('should render taskOverview', () => {
      const onDrag = jest.fn()
      const onDrop = jest.fn()
      const { getByTestId } = render(
         <DndProvider backend={HTML5Backend}>
            <TaskOverview
               task={
                  new TaskOverviewModel(
                     {
                        task_id: 't11',
                        fields: [],
                        actions: []
                     },
                     taskActionsApi,
                     () => {},
                     '123'
                  )
               }
               onDrop={onDrop}
               onDrag={onDrag}
            />
         </DndProvider>
      )

      const draggableTask = getByTestId('draggable-taskt11')
      expect(draggableTask).toBeInTheDocument

      function dragAndDrop(src: Element) {
         fireEvent.dragStart(draggableTask)
         fireEvent.dragEnd(draggableTask)
      }

      dragAndDrop(draggableTask)
      waitFor(() => {
         expect(onDrag).toBeCalled()
      })
   })

   it('should render the given fields', () => {
      const onDrag = jest.fn()
      const onDrop = jest.fn()
      const { getByText, getByAltText } = render(
         <DndProvider backend={HTML5Backend}>
            <TaskOverview task={task} onDrop={onDrop} onDrag={onDrag} />
         </DndProvider>
      )
      getByText(task.fields[0].value)
      getByAltText(task.fields[1].name)
      getByText(task.fields[2].value)
   })
})
