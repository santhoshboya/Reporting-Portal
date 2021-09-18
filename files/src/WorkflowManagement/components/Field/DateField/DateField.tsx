import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import DatePicker from '../../../../Common/components/DatePicker'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { Label } from '../styledComponents'
import { GofFieldType } from '../types'
import '../styles.css'

@observer
class DateField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   datePickerFieldRef: React.RefObject<any> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         return !this.datePickerFieldRef.current?.isError
      }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.datePickerFieldRef.current?.onBlur()
      }
   }
   validate = () => plainTextValidation(this.value)

   onChangeDate = (date: string) => {
      const { onChangeFieldResponse } = this.props.fieldData
      const formattedDate = new Date(date)
      const day = formattedDate.getDate()
      const year = formattedDate.getFullYear()
      const month = formattedDate.getMonth() + 1
      const yearFormattedDate = `${year}-${month}-${day}`
      onChangeFieldResponse(yearFormattedDate)
      this.value = yearFormattedDate
   }
   render() {
      const { fieldResponse } = this.props.fieldData
      const {
         isFieldWritable,
         isFieldReadable,
         displayName,
         isFieldRequired
      } = this.props.fieldTemplate
      const otherProps: any = {}
      if (isFieldRequired) otherProps.validate = this.validate
      if (fieldResponse && fieldResponse !== '')
         otherProps.date = new Date(
            parseInt(fieldResponse.slice(0, 4)),
            parseInt(fieldResponse.slice(5, 7)),
            parseInt(fieldResponse.slice(8, 10))
         )

      return isFieldReadable ? (
         <Fragment>
            <Label>{displayName.toUpperCase()}</Label>
            <DatePicker
               ref={this.datePickerFieldRef}
               disabled={!isFieldWritable}
               isValid={true}
               onSelectDate={this.onChangeDate}
               label={displayName}
               className={'dateFieldStyles'}
               {...otherProps}
            />
         </Fragment>
      ) : null
   }
}

export { DateField }
