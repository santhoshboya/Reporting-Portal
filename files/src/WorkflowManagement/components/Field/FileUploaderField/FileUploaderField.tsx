import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import FileUploadField from '../../../../Common/components/FileUploadField'
import { Label } from '../../../../Common/components/DropDown/styledComponents'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'
import '../styles.css'

@observer
class FileUploader extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   fileUploadFieldrFieldRef: React.RefObject<any> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      // if (isFieldRequired) {
      //    const errorMessage = this.fileUploadFieldrFieldRef.current
      //       ?.fileUploadFieldRef.current?.error
      //    return errorMessage === '' ? true : false
      // }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.fileUploadFieldrFieldRef.current?.fileUploadFieldRef.current?.onBlur()
      }
   }

   onChangeValue = event => {
      const { onChangeFieldResponse } = this.props.fieldData
      onChangeFieldResponse(event.target.value)
      this.value = event.target.value
   }

   validate = () => plainTextValidation(this.value)

   render() {
      const {
         isFieldWritable,
         isFieldReadable,
         displayName,
         isFieldRequired,
         allowedFormatsRegex
      } = this.props.fieldTemplate
      const { fieldResponse } = this.props.fieldData
      const inputProps: Record<string, any> = {
         enableEdit: !isFieldWritable,
         handleOnSuccessFileUpload: this.onChangeValue,
         url: fieldResponse
      }
      if (isFieldRequired) inputProps.validate = this.validate
      return isFieldReadable ? (
         <Fragment>
            <Label>{displayName.toUpperCase()}</Label>
            <FileUploadField
               ref={this.fileUploadFieldrFieldRef}
               fileAcceptType={allowedFormatsRegex}
               extraBucketPath=''
               {...inputProps}
            />
         </Fragment>
      ) : null
   }
}

export { FileUploader }
