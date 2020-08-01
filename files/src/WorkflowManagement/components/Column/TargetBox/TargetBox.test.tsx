import React from 'react'
import { render } from '@testing-library/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import TaskOverviewActionModel from '../../../stores/models/TaskOverviewActionModel'

import TargetBox from '.'

/*global expect,jest*/

describe('taskOverview testcases', () => {
   it('should render taskOverview', () => {
      const changeDraggedItem = jest.fn()
      const { getByText } = render(
         <DndProvider backend={HTML5Backend}>
            <TargetBox
               action={
                  new TaskOverviewActionModel({
                     action_id: '12',
                     name: 'payment',
                     button_text: 'payment',
                     button_color: 'blue'
                  })
               }
               selectedActionId={'123'}
               changeDraggedItem={changeDraggedItem}
               draggedItem={null}
            />
         </DndProvider>
      )

      const target = getByText('payment')
      expect(target).toBeInTheDocument
   })
})
