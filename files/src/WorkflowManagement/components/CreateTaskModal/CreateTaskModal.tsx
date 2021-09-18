import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import CreateTaskComponent from '../CreateTaskComponent'
import WorkflowUiStore from '../../stores/WorkflowUiStore'
import TaskTemplateStore from '../../stores/TaskTemplateStore'
import TaskStore from '../../stores/TaskStore'
import { EmptyWrapper } from '../CreateTaskComponent/styledComponents'
import './styles.css'
interface InjectedProps {
   workflowUiStore: WorkflowUiStore
   taskTemplateStore: TaskTemplateStore
   taskStore: TaskStore
}

@inject('workflowUiStore', 'taskTemplateStore', 'taskStore')
@observer
class CreateTaskModal extends Component {
   @observable isCreateModalIsOpen = false
   createTaskModalRef: React.RefObject<BaseModalContainer> = React.createRef()

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getWorkflowUiStore = () => this.getInjectedProps().workflowUiStore

   getTaskTemplateStore = () => this.getInjectedProps().taskTemplateStore

   getTaskStore = () => this.getInjectedProps().taskStore

   onCloseTaskModal = () => {
      const { setCreateTaskModalClose } = this.getWorkflowUiStore()
      setCreateTaskModalClose()
   }

   render() {
      const { showCreateTaskModal } = this.getWorkflowUiStore()
      return showCreateTaskModal ? (
         <BaseModalContainer
            ref={this.createTaskModalRef}
            mounted={showCreateTaskModal}
            onClose={this.onCloseTaskModal}
            underlayClickExits={true}
            minWidth={'920px'}
         >
            <CreateTaskComponent
               taskTemplateStore={this.getTaskTemplateStore()}
               taskStore={this.getTaskStore()}
            />
         </BaseModalContainer>
      ) : (
         <EmptyWrapper />
      )
   }
}

export { CreateTaskModal }
