import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { API_SUCCESS } from '@ib/api-constants'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import ColumnModel from '../../stores/models/ColumnModel'
import ColumnsAPI from '../../services/ColumnsService/ColumnsFixture'
import getColumnsData from '../../fixtures/getColumnsResponse.json'

import Column from '.'

const taskActionsApi = new TaskActionsApi()
const columnService = new ColumnsAPI()

const column = new ColumnModel(
   getColumnsData.columns[0],
   columnService.getTasksOverview,
   taskActionsApi,
   () => {},
   '123'
)
const fields = column.taskStore.tasks[0].fields

/*global expect,jest*/

describe('taskOverview testcases', () => {
   it('should render taskOverview', () => {
      const { getByTestId } = render(
         <DndProvider backend={HTML5Backend}>
            <Column
               onClickTask={() => {}}
               shouldHighlight={false}
               column={column}
            />
         </DndProvider>
      )

      const taskt17 = getByTestId('draggable-taskc1t1rm')
      expect(taskt17).toBeInTheDocument

      function drag(src: Element) {
         fireEvent.dragStart(src)
      }
      function drop(dst: Element) {
         fireEvent.dragEnter(dst)
         fireEvent.drop(dst)
         fireEvent.dragLeave(dst)
      }
      drag(taskt17)

      waitFor(() => {
         const action34 = getByTestId('action-c1124')
         expect(action34).toBeInTheDocument
         drop(action34)
      })
   })

   it('should render the tasks overview', () => {
      const { getByText, getAllByAltText } = render(
         <Column
            onClickTask={() => {}}
            shouldHighlight={false}
            column={column}
         />
      )
      getByText(fields[0].value)
      getAllByAltText(fields[1].name)
      getByText(fields[2].value)
   })
})
