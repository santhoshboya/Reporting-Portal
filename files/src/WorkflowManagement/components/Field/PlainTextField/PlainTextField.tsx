import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import TextInput from '../../../../Common/components/TextInput'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { TextInputProps, GofFieldType } from '../types'
import '../styles.css'

@observer
class PlainTextField extends Component<GofFieldType> {
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
      this.textInputFieldRef.current?.validateInput()
   }
   onChangeValue = event => {
      const { onChangeFieldResponse } = this.props.fieldData
      this.value = event.target.value
      onChangeFieldResponse(event.target.value)
   }

   validate = () => plainTextValidation(this.value)

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

      if (isFieldRequired) {
         inputProps.validate = this.validate
      }

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

export { PlainTextField }
