import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import Modal from 'react-modal'

import { withTranslation, WithTranslation } from 'react-i18next'

import Button from '../../../../Common/components/Button'
import CloseIcon from '../../../../Common/icons/CloseIcon'
import Colors from '../../../../Common/themes/Colors'
import { ButtonFontAASmall } from '../../../../Common/styleGuide/Typos/styledComponents'
import Loader from '../../../../Common/components/Loader'

import TaskOverviewModel from '../../../stores/models/TaskOverviewModel'

import { LoaderWrapper } from '../styledComponents'
import TargetBox from '../TargetBox'
import {
   SaveButton,
   CancelButton,
   ModalContainer,
   MainContainer,
   TargetsBox,
   ButtonWrapper,
   modalCustomStyles
} from './styledComponents'

const { sizes, types } = Button
interface ModalProps extends WithTranslation {
   isModalOpen: boolean
   task: TaskOverviewModel | null
   selectedActionId: string | null
   closeModal: () => void
   onSubmit: (taskId: string) => void
   changeDragItem: (item) => void
   draggedItem: any
}

//FIXME:fix usage of setTimeOut
//TODO:move modal to common component
@observer
class ActionModal extends PureComponent<ModalProps> {
   @computed
   get apiStatus() {
      const { task } = this.props
      if (task) {
         return task.getTaskActionsAPIStatus
      }
      return null
   }
   onSubmit = (): void => {
      const { onSubmit, task, selectedActionId } = this.props
      if (task && selectedActionId) {
         onSubmit(task.id)
      }
   }

   renderLoader = (): React.ReactNode => (
      <LoaderWrapper>
         <Loader type={'ThreeDots'} color={Colors.white} />
      </LoaderWrapper>
   )

   getTargetBoxes = (): JSX.Element[] | null => {
      const { task, selectedActionId, changeDragItem, draggedItem } = this.props
      return task
         ? task.actions.map(action => (
              <TargetBox
                 key={action.id}
                 action={action}
                 selectedActionId={selectedActionId}
                 changeDraggedItem={changeDragItem}
                 draggedItem={draggedItem}
              />
           ))
         : null
   }

   renderActionButtons = (): React.ReactNode => {
      const { closeModal, t } = this.props
      return (
         <ButtonWrapper>
            <CancelButton
               text={t('workflowManagement:modalButton.cancel')}
               type={types.outline}
               size={sizes.small}
               onClick={closeModal}
            />
            <SaveButton
               text={t('workflowManagement:modalButton.proceed')}
               onClick={this.onSubmit}
               apiStatus={this.apiStatus}
               textTypo={ButtonFontAASmall}
               renderLoader={this.renderLoader}
            ></SaveButton>
         </ButtonWrapper>
      )
   }

   renderModalContainer = (): React.ReactNode => {
      const { closeModal } = this.props
      return (
         <ModalContainer>
            <ButtonWrapper>
               <CloseIcon onClick={closeModal} fill={Colors.basic800} />
            </ButtonWrapper>
            <MainContainer>
               <TargetsBox>{this.getTargetBoxes()}</TargetsBox>
               {this.renderActionButtons()}
            </MainContainer>
         </ModalContainer>
      )
   }

   render() {
      const { isModalOpen } = this.props
      if (isModalOpen) {
         return (
            <Modal
               ariaHideApp={false}
               isOpen={isModalOpen}
               style={modalCustomStyles}
            >
               {this.renderModalContainer()}
            </Modal>
         )
      }
      return null
   }
}

export default withTranslation()(ActionModal)
