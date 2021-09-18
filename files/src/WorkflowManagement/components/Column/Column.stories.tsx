import React from 'react'
import { storiesOf } from '@storybook/react'

import ColumnModel from '../../stores/models/ColumnModel'
import getColumnsResponse from '../../fixtures/getColumnsResponse.json'

import TaskActionsApi from '../../services/TaskActionsService/TaskActionsAPI'
import ColumnsAPI from '../../services/ColumnsService/ColumnsFixture'
import Column from '.'

const getColumnsAPI = new ColumnsAPI().getTasksOverview
const taskActionsApi = new TaskActionsApi()
const columnData = new ColumnModel(
   getColumnsResponse.columns[0],
   getColumnsAPI,
   taskActionsApi,
   () => {},
   '123'
)

storiesOf('Column', module)
   .add('default Column view', () => (
      <Column
         onClickTask={() => {}}
         column={columnData}
         shouldHighlight={false}
      />
   ))
   .add('highlighted Column view', () => (
      <Column
         onClickTask={() => {}}
         column={columnData}
         shouldHighlight={true}
      />
   ))
