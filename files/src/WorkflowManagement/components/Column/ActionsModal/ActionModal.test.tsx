import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'

import i18n from '../../../../Common/i18n'
import TaskActionsApi from '../../../services/TaskActionsService/TaskActionsAPI'
import TaskOverviewModel from '../../../stores/models/TaskOverviewModel'

import ActionModal from '.'
/*global expect,jest*/

const taskActionsApi = new TaskActionsApi()

describe('Action modal testcases', () => {
   it('should render action modal', () => {
      const onSubmit = jest.fn()
      const closeModal = jest.fn()
      const changeDragItem = jest.fn()
      const { getByText, debug } = render(
         <I18nextProvider i18n={i18n}>
            <ActionModal
               changeDragItem={changeDragItem}
               draggedItem={null}
               isModalOpen={true}
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
               selectedActionId={null}
               closeModal={closeModal}
               onSubmit={onSubmit}
            />
         </I18nextProvider>
      )

      const cancelButton = getByText('Cancel')
      expect(cancelButton).toBeInTheDocument
      fireEvent.click(cancelButton)
      expect(closeModal).toBeCalled()
   })
   it('should call on submit on press save', () => {
      const onSubmit = jest.fn()
      const closeModal = jest.fn()
      const changeDragItem = jest.fn()
      const { getByText, debug } = render(
         <ActionModal
            changeDragItem={changeDragItem}
            draggedItem={null}
            isModalOpen={true}
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
            selectedActionId={'12'}
            closeModal={closeModal}
            onSubmit={onSubmit}
         />
      )

      const saveButton = getByText('Proceed')
      expect(saveButton).toBeInTheDocument
      fireEvent.click(saveButton)
      expect(onSubmit).toBeCalled()
      expect(saveButton).toBeInTheDocument
   })
})
