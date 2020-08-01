import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import columnsResponse from '../../fixtures/getColumnsResponse.json'
import TaskOverviewModel from '../../stores/models/TaskOverviewModel'
import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'

import Task from '.'

const taskActionsApi = new TaskActionsApi()

describe('Task tests', () => {
   let task
   let onClickTask
   beforeEach(() => {
      const { tasks } = columnsResponse.columns[0]
      task = new TaskOverviewModel(tasks[0], taskActionsApi, () => {}, '123')
      onClickTask = jest.fn()
   })

   it('should test if onClick task fires a callback', () => {
      const { getByText } = render(
         <Task
            onClickAction={() => {}}
            task={task}
            onClickTask={onClickTask}
            selectedTabId={'tab1'}
         />
      )

      fireEvent.click(getByText(task.id))

      expect(onClickTask).toBeCalledWith(task.id)
   })

   it('should test if should show actions on hover', () => {
      const { getByText } = render(
         <Task
            onClickAction={() => {}}
            task={task}
            onClickTask={onClickTask}
            selectedTabId={'tab1'}
         />
      )

      fireEvent.mouseOver(getByText(task.id))

      expect(getByText('Confirm')).toBeInTheDocument
      expect(getByText('Delete')).toBeInTheDocument
   })
})
