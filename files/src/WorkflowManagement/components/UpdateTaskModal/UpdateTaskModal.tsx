import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import UpdateTaskComponent from '../../components/UpdateTaskComponent'
import WorkflowUiStore from '../../stores/WorkflowUiStore'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from '../../stores/TaskStore'

interface InjectedProps {
   workflowUiStore: WorkflowUiStore
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@inject('workflowUiStore', 'taskTemplateStore', 'taskStore')
@observer
class UpdateTaskModal extends Component {
   @observable isUpdateTaskModalOpen = false
   updateTaskModalRef: React.RefObject<BaseModalContainer> = React.createRef()

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getWorkflowUiStore = () => this.getInjectedProps().workflowUiStore

   getTaskTemplateStore = () => this.getInjectedProps().taskTemplateStore

   getTaskStore = () => this.getInjectedProps().taskStore

   onCloseTaskModal = () => {
      const { setUpdateTaskModalClose } = this.getWorkflowUiStore()
      setUpdateTaskModalClose()
   }

   render() {
      const { showUpdateTaskModal } = this.getWorkflowUiStore()

      return showUpdateTaskModal ? (
         <BaseModalContainer
            ref={this.updateTaskModalRef}
            mounted={showUpdateTaskModal}
            onClose={this.onCloseTaskModal}
            underlayClickExits={false}
            minWidth={'920px'}
         >
            <UpdateTaskComponent
               taskTemplateStore={this.getTaskTemplateStore()}
               taskStore={this.getTaskStore()}
            />
         </BaseModalContainer>
      ) : null
   }
}

export { UpdateTaskModal }
