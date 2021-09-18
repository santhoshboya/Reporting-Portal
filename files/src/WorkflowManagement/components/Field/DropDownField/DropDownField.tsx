import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import DropDown from '../../../../Common/components/DropDown'
import { getValuesWithLabels } from '../../../utils/FieldUtils'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'

@observer
class DropDownField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse

   dropDownFieldRef: React.RefObject<DropDown> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         return !this.dropDownFieldRef.current?.isError
      }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.dropDownFieldRef.current?.onBlur()
      }
   }

   validate = () => plainTextValidation(this.value)

   onChangeValue = (value: string) => {
      this.value = value
      const { onChangeFieldResponse } = this.props.fieldData
      onChangeFieldResponse(this.value)
   }

   getFieldValue = (responseValue: string) => ({
      value: responseValue,
      label: responseValue
   })

   render() {
      const {
         isFieldWritable,
         isFieldReadable,
         displayName,
         isFieldRequired,
         placeholderText,
         fieldValues
      } = this.props.fieldTemplate
      const { fieldResponse } = this.props.fieldData
      const otherProps: any = {}
      if (isFieldRequired) otherProps.validate = this.validate
      if (fieldResponse !== '' && fieldResponse !== undefined)
         otherProps.value = this.getFieldValue(fieldResponse)

      return isFieldReadable ? (
         <Fragment>
            <DropDown
               ref={this.dropDownFieldRef}
               labelText={displayName.toUpperCase()}
               placeholder={placeholderText}
               options={getValuesWithLabels(fieldValues)}
               isDisabled={!isFieldWritable}
               fieldResponse={fieldResponse}
               onChange={this.onChangeValue}
               className={'field-width'}
               {...otherProps}
            />
         </Fragment>
      ) : null
   }
}

export { DropDownField }
