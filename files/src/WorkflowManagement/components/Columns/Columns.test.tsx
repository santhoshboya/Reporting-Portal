import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { API_FETCHING, API_SUCCESS } from '@ib/api-constants'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import getColumnsResponse from '../../fixtures/getColumnsResponse.json'
import ColumnsFixture from '../../services/ColumnsService/ColumnsFixture'
import ColumnModel from '../../stores/models/ColumnModel'

import Columns from '.'

const taskActionsApi = new TaskActionsApi()
const getTaskOverview = new ColumnsFixture().getTasksOverview
const responseColumns = getColumnsResponse.columns

const c1 = new ColumnModel(
   responseColumns[0],
   getTaskOverview,
   taskActionsApi,
   () => {},
   '123'
)
const c2 = new ColumnModel(
   responseColumns[1],
   getTaskOverview,
   taskActionsApi,
   () => {},
   '123'
)

const columns = [c1, c2]

describe('Columns component tests', () => {
   let mockGetColumnsCallback
   let onPerformingActionOnTask

   beforeEach(() => {
      mockGetColumnsCallback = jest.fn()
      onPerformingActionOnTask = jest.fn()
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('Should call back to getColumns on mount', () => {
      render(
         <Columns
            onClickTask={() => {}}
            columns={columns}
            selectedBoardId={'Board-1'}
            onColumnsMount={mockGetColumnsCallback}
            getColumnsAPIStatus={API_FETCHING}
            getColumnsAPIError={null}
            highlightedColumnsList={[]}
         />
      )
      expect(mockGetColumnsCallback).toBeCalled()
   })

   it('should render loading state while  fetching columns', () => {
      const { getByTestId } = render(
         <Columns
            onClickTask={() => {}}
            columns={columns}
            selectedBoardId={'Board-1'}
            onColumnsMount={mockGetColumnsCallback}
            getColumnsAPIStatus={API_FETCHING}
            getColumnsAPIError={null}
            highlightedColumnsList={[]}
         />
      )

      getByTestId('loader')
   })

   it('should render all the columns', () => {
      const { getByText } = render(
         <Columns
            onClickTask={() => {}}
            columns={columns}
            selectedBoardId={'Board-1'}
            onColumnsMount={mockGetColumnsCallback}
            getColumnsAPIStatus={API_SUCCESS}
            getColumnsAPIError={null}
            highlightedColumnsList={[]}
         />
      )

      getByText(columns[0].name)
      getByText(columns[1].name)
   })
   it('should render noData view on zero columns', () => {
      const { getByText } = render(
         <Columns
            onClickTask={() => {}}
            columns={[]}
            selectedBoardId={'Board-1'}
            onColumnsMount={mockGetColumnsCallback}
            getColumnsAPIStatus={API_SUCCESS}
            getColumnsAPIError={null}
            highlightedColumnsList={[]}
         />
      )

      getByText('No data Found.')
   })

   //TODO: Write testcase for highlight columns on task actions
})
