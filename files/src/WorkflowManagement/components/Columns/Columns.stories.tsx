import React from 'react'
import { storiesOf } from '@storybook/react'

import { API_INITIAL } from '@ib/api-constants'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import getColumnsResponse from '../../fixtures/getColumnsResponse.json'
import ColumnService from '../../services/ColumnsService/ColumnsFixture'
import ColumnModel from '../../stores/models/ColumnModel'

import Columns from '.'

const taskActionsApi = new TaskActionsApi()
const getTaskOverview = new ColumnService().getTasksOverview
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

storiesOf('Columns', module).add('columns view loading', () => (
   <Columns
      onClickTask={() => {}}
      columns={columns}
      selectedBoardId={'Board-1'}
      onColumnsMount={() => {}}
      getColumnsAPIStatus={API_INITIAL}
      getColumnsAPIError={null}
      highlightedColumnsList={[]}
   />
))
