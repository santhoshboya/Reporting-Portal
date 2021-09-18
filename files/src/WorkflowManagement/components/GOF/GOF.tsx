import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { observable } from 'mobx'
import GoFModel from '../../stores/models/GOFTemplateModel'
import GofFieldModel from '../../stores/models/GofFieldModel'
import Field from '../Field'
import { GOFWrapper, FieldRowWrapper } from './styledComponents'

interface GOFProps {
   fields: Array<GofFieldModel>
   gofTemplate: GoFModel
}

@observer
class GOF extends Component<GOFProps> {
   @observable fieldsRefsMap: Map<string, React.RefObject<Field>> = new Map()

   createAndGetFieldRef = (fieldId: string) => {
      if (this.fieldsRefsMap.has(fieldId)) {
         return this.fieldsRefsMap.get(fieldId)
      }
      const fieldRef: React.RefObject<Field> = React.createRef()
      this.fieldsRefsMap.set(fieldId, fieldRef)
      return this.fieldsRefsMap.get(fieldId)
   }

   isAllFieldsValid = () => {
      const fieldRefsArray = Array.from(this.fieldsRefsMap.values())
      const isValids = fieldRefsArray.map(fieldRef =>
         fieldRef.current?.isFieldValid()
      )

      const isValid = isValids.find(isFieldValid => isFieldValid === false)
      if (isValid === false) return false
      return true
   }
   validateGofFields = () => {
      const fieldRefsArray = Array.from(this.fieldsRefsMap.values())
      fieldRefsArray.forEach(fieldRef => {
         fieldRef.current?.validateField()
      })
   }

   renderFieldRow = fields => (
      <FieldRowWrapper key={fields[0].fieldTemplate.fieldId}>
         {fields.map(field => (
            <Field
               ref={this.createAndGetFieldRef(field.fieldData.fieldId)}
               key={field.fieldData.fieldId}
               fieldTemplate={field.fieldTemplate}
               fieldData={field.fieldData}
            />
         ))}
      </FieldRowWrapper>
   )

   renderFields = () => {
      const {
         fields,
         gofTemplate: { maxColumns }
      } = this.props
      let currentColumnNumber = 1
      let fieldsInARow: Array<any> = []
      const fieldRows: Array<any> = []
      fields.forEach(field => {
         if (currentColumnNumber <= maxColumns) {
            fieldsInARow.push(field)
            currentColumnNumber++
         } else {
            fieldRows.push(this.renderFieldRow(fieldsInARow))
            currentColumnNumber = 2
            fieldsInARow = [field]
         }
      })
      if (fieldsInARow.length <= maxColumns) {
         fieldRows.push(this.renderFieldRow(fieldsInARow))
      }
      return fieldRows
   }

   render() {
      return <GOFWrapper>{this.renderFields()}</GOFWrapper>
   }
}

export { GOF }
