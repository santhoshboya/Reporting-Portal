import React, { Component } from 'react'
import { observer } from 'mobx-react'
import uuid from 'react-uuid'
import { observable } from 'mobx'

import Card from '../../../Common/components/Card'
import { GOF_SELECTOR } from '../../constants/FieldTypesConstants'
import TaskTempleteModel from '../../stores/models/TaskTempleteModel'
import GOFModel from '../../stores/models/GOFModel'
import GOFTemplateModel from '../../stores/models/GOFTemplateModel'
import GofFieldModel from '../../stores/models/GofFieldModel'
import GOF from '../GOF'
import './styles.css'
import { ButtonWrapper } from '../GOF/styledComponents'
import {
   TaskWrapper,
   GOFWrappper,
   GOFName,
   AddAnother
} from './styledComponents'

interface TaskProps {
   taskDetails: any
   taskTemplate: TaskTempleteModel
}
@observer
class Task extends Component<TaskProps> {
   @observable gofsRefMap: Map<string, React.RefObject<GOF>> = new Map()

   getMappedFieldsWithTemplates = (gof: GOFModel) => {
      const gofTemplate: GOFTemplateModel = this.getGofTemplate(gof.gofId)
      const fields: Array<GofFieldModel> = []

      gof.fields.forEach((field: GofFieldModel) => {
         const fieldProps: any = {
            fieldTemplate: gofTemplate.getField(field.fieldId),
            fieldData: field
         }
         fields.push(fieldProps)
      })
      return fields
   }

   createAndGetGofRef = (uuid: string) => {
      if (this.gofsRefMap.has(uuid)) {
         return this.gofsRefMap.get(uuid)
      }
      const gofRef: any = React.createRef()
      this.gofsRefMap.set(uuid, gofRef)
      return this.gofsRefMap.get(uuid)
   }

   renderAddAnotherButton = gofId => {
      const enableAddAnother = this.getGofTemplate(gofId).enableAddAnother
      return enableAddAnother ? (
         <ButtonWrapper>
            <AddAnother id={gofId} onClick={this.addAnotherGOF}>
               + Add another
            </AddAnother>
         </ButtonWrapper>
      ) : null
   }

   renderGOF = (gofs: Array<any>) => {
      const gofTemplate: GOFTemplateModel = this.getGofTemplate(gofs[0].gofId)
      const gofName = gofTemplate.gofDisplayName
      const {
         taskDetails: { gofsLength }
      } = this.props
      return (
         <GOFWrappper key={gofs[0].gofId} gofsLength={gofsLength}>
            <GOFName>{gofName}</GOFName>
            {gofs.map(gof => {
               const fields = this.getMappedFieldsWithTemplates(gof)
               const { uuid, gofId } = gof
               const gofRef = this.createAndGetGofRef(uuid)
               return (
                  <Card className={'gof-card'} key={uuid}>
                     <GOF
                        ref={gofRef}
                        key={uuid}
                        fields={fields}
                        gofTemplate={this.getGofTemplate(gofId)}
                     />
                  </Card>
               )
            })}
            {this.renderAddAnotherButton(gofs[0].gofId)}
         </GOFWrappper>
      )
   }

   renderTask = () =>
      this.taskDetails().map((gof: Array<GOFModel>) => this.renderGOF(gof))

   getGofTemplate = id => {
      const { taskTemplate } = this.props
      return taskTemplate.getGof(id)
   }

   isNotHiddenCell = (gofId: string) => this.getGofTemplate(gofId).order !== -1

   isGOFSelector = (gofId: string) =>
      this.getGofTemplate(gofId).fields[0].fieldType === GOF_SELECTOR

   getFirstOptionOfGOFSelector = (gofId: string) =>
      this.getGofTemplate(gofId).fields[0].fieldValues[0].name

   getGOFSelectorValues = (gof: GOFModel) => {
      const { taskTemplate } = this.props
      const { gofId } = gof
      return taskTemplate
         .getGof(gofId)
         .fields[0].fieldValues.find(
            field => field.name === gof.fields[0].fieldResponse
         )
   }

   addAnotherGOF = event => {
      const id = event.target.id
      const gofTemplate = this.getGofTemplate(id)
      const gofId = uuid()
      this.props.taskDetails.addGOF(gofId, new GOFModel(gofId, gofTemplate))
      console.log(this.props.taskDetails)
   }

   taskDetails = () => {
      const { taskDetails } = this.props
      const taskDetailsMappedWithTemplate = new Map()
      taskDetails &&
         taskDetails.getGOFList().forEach((gof: GOFModel) => {
            const { gofId } = gof
            const isPresentIntaskDetailsWithMappedTemplate = taskDetailsMappedWithTemplate.has(
               gofId
            )
            if (
               isPresentIntaskDetailsWithMappedTemplate &&
               this.isNotHiddenCell(gofId)
            ) {
               const previousData = taskDetailsMappedWithTemplate.get(gofId)
               taskDetailsMappedWithTemplate.set(gofId, [...previousData, gof])
            } else if (this.isNotHiddenCell(gofId))
               taskDetailsMappedWithTemplate.set(gofId, [gof])
            if (this.isGOFSelector(gofId)) {
               if (gof.fields[0].fieldResponse === '')
                  gof.fields[0].onChangeFieldResponse(
                     this.getFirstOptionOfGOFSelector(gofId)
                  )

               let gofIds = []
               const gofSelectorValues = this.getGOFSelectorValues(gof)
               if (gofSelectorValues) {
                  gofIds = gofSelectorValues.gof_ids
               }
               taskDetailsMappedWithTemplate.set(gofId, [gof])
               gofIds.forEach(id => {
                  const preData = taskDetailsMappedWithTemplate.get(gofId)
                  taskDetailsMappedWithTemplate.set(gofId, [
                     ...preData,
                     ...taskDetails.getGOF(id)
                  ])
               })
            }
         })
      const result = Array.from(taskDetailsMappedWithTemplate.values())
      return result
   }

   isAllGOFFieldsValid = () => {
      const gofRefsArray = Array.from(this.gofsRefMap.values())
      const isValids = gofRefsArray.map(gofRef =>
         gofRef.current?.isAllFieldsValid()
      )
      const isValid = isValids.find(isGOFValid => isGOFValid === false)
      if (isValid === false) return false
      return true
   }

   validateFields = () => {
      const gofRefsArray = Array.from(this.gofsRefMap.values())
      gofRefsArray.forEach(gofRef => {
         gofRef.current?.validateGofFields()
      })
   }

   getRequestObject = () => {
      const gofList: Array<GOFModel> = []
      this.taskDetails().forEach(gofs => {
         gofs.forEach(gof => {
            gofList.push(gof.getRequestObject())
         })
      })
      return {
         action_id: '',
         task_gofs: gofList
      }
   }

   render() {
      return <TaskWrapper>{this.renderTask()}</TaskWrapper>
   }
}

export { Task }
