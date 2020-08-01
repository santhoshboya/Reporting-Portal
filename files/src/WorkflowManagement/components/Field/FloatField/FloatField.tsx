import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import TextInput from '../../../../Common/components/TextInput'
import { TextInputProps, GofFieldType } from '../types'
import { floatValidation } from '../../../utils/ValidationUtils'
import '../styles.css'
@observer
class FloatField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   textInputFieldRef: React.RefObject<TextInput> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         return !this.textInputFieldRef.current?.isError
      }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.textInputFieldRef.current?.validateInput()
      }
   }

   validate = () => floatValidation(this.value)
   onChangeValue = event => {
      const { onChangeFieldResponse } = this.props.fieldData
      onChangeFieldResponse(event.target.value)
      this.value = event.target.value
   }
   render() {
      const {
         isFieldWritable,
         isFieldReadable,
         displayName,
         isFieldRequired,
         placeholderText
      } = this.props.fieldTemplate
      const { fieldResponse } = this.props.fieldData
      const inputProps: TextInputProps = {
         label: displayName,
         placeholder: placeholderText,
         value: fieldResponse,
         disabled: !isFieldWritable,
         onChange: this.onChangeValue
      }
      if (isFieldRequired) inputProps.validate = this.validate
      return isFieldReadable ? (
         <Fragment>
            <TextInput
               ref={this.textInputFieldRef}
               {...inputProps}
               className={'field-height-width'}
            />
         </Fragment>
      ) : null
   }
}

export { FloatField }
