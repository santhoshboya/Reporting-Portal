import { action, observable, computed } from 'mobx'

import uuid from 'react-uuid'

import GOFModel from '../GOFModel'

class TaskModel {
   @observable gofs: Map<string, GOFModel> = new Map()
   templateId!: string
   selectedActionId!: string

   @action.bound
   setTaskDetails(template) {
      this.gofs = new Map()
      this.templateId = template.templateId
      template.gofs.forEach(gof => {
         const id = uuid()
         this.gofs.set(id, new GOFModel(id, gof))
      })
   }

   @action.bound
   onChangeActionId(id: string) {
      this.selectedActionId = id
   }

   @action.bound
   addGOF(id, gof): void {
      this.gofs.set(id, gof)
   }

   @action.bound
   getGOF(id: string) {
      return this.getGOFList().filter((gof: GOFModel) => gof.gofId === id)
   }

   @action.bound
   getGofWithUuid(uuid) {
      return this.gofs.get(uuid)
   }

   @action.bound
   getGOFList(): Array<GOFModel> {
      return Array.from(this.gofs.values())
   }

   @computed
   get gofsLength() {
      return this.gofs.size
   }

   @action.bound
   getReverseGofs() {
      return this.getGOFList().reverse()
   }
}

export { TaskModel }
