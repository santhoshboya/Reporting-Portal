import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import TextArea from '../../../../Common/components/TextInput/TextArea'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType, TextInputProps } from '../types'
import { TextAreaTypo } from '../styledComponents'
import '../styles.css'

@observer
class LongTextField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   textAreaRef: React.RefObject<TextArea> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired)
         return !this.textAreaRef.current?.inputRef.current.isError()
      return true
   }

   onValidate = () => {
      this.textAreaRef.current?.validateInput()
   }

   validate = () => plainTextValidation(this.value)

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
            <TextArea
               ref={this.textAreaRef}
               {...inputProps}
               containerClassName={'text-area-width'}
               inputTypo={TextAreaTypo}
            />
         </Fragment>
      ) : null
   }
}

export { LongTextField }
