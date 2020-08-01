import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import columnsResponse from '../../fixtures/getColumnsResponse.json'
import ColumnsService from '../../services/ColumnsService/ColumnsFixture'
import TaskActionsApi from '../../services/TaskActionsService/TaskActionsFixture'
import ColumnsStore from '../../stores/ColumnsStore'

import { waitForMilliseconds } from '../../../Common/utils/TestUtils'

import ListView from '.'

describe('ListView tests', () => {
   let columnsStore
   let onClickTask
   beforeEach(() => {
      columnsStore = new ColumnsStore(
         new ColumnsService(),
         new TaskActionsApi()
      )
      columnsStore.setGetColumnsAPIResponse(columnsResponse)
      onClickTask = jest.fn()
   })
   it('should test if on click tab bar changes the tasks list rendered and onClickTask fires a call back', async () => {
      const { getByText, queryAllByTestId } = render(
         <ListView
            columnsStore={columnsStore}
            onClickTask={onClickTask}
            selectedBoardId={'board-1'}
         />
      )
      const { id } = columnsStore.columns[1].taskStore.tasks[0]

      await waitForMilliseconds(5000)

      fireEvent.click(getByText('Submitted'))
      expect(queryAllByTestId('task')).toHaveLength(3)
      fireEvent.click(queryAllByTestId('task')[0])
      expect(onClickTask).toHaveBeenCalledWith(id)
   })
})
