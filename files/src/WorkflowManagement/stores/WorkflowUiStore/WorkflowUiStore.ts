import { observable, action } from 'mobx'

class WorkflowUiStore {
   @observable showCreateTaskModal
   @observable showUpdateTaskModal

   constructor() {
      this.init()
   }

   @action.bound
   init() {
      this.showCreateTaskModal = false
      this.showUpdateTaskModal = false
   }

   @action.bound
   setCreateTaskModalOpen() {
      this.showCreateTaskModal = true
   }

   @action.bound
   setCreateTaskModalClose() {
      this.showCreateTaskModal = false
   }

   @action.bound
   setUpdateTaskModalOpen() {
      this.showUpdateTaskModal = true
   }

   @action.bound
   setUpdateTaskModalClose() {
      this.showUpdateTaskModal = false
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default WorkflowUiStore
