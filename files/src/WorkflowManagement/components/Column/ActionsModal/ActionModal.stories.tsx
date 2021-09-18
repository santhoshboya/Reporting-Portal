import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import getColumnsResponse from '../../../fixtures/getColumnsResponse.json'
import TaskOverviewModel from '../../../stores/models/TaskOverviewModel'
import TaskActionsApi from '../../../services/TaskActionsService/TaskActionsAPI'

import ActionModal from '.'

export default {
   title: 'ActionModal'
}

const taskActionsApi = new TaskActionsApi()

export const BasicTaskOverview = () => (
   <DndProvider backend={HTML5Backend}>
      <ActionModal
         draggedItem={null}
         changeDragItem={() => action('change drag item')}
         selectedActionId={'123'}
         isModalOpen={boolean('isModalOpen', true)}
         task={
            new TaskOverviewModel(
               getColumnsResponse.columns[0].tasks[0],
               taskActionsApi,
               () => {},
               '123'
            )
         }
         closeModal={() => action('clicked close modal')}
         onSubmit={() => action('clicked save modal')}
      />
   </DndProvider>
)

BasicTaskOverview.story = {
   decorators: [withKnobs]
}
