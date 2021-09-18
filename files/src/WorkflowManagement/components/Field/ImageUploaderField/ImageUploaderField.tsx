import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import { Label } from '../../../../Common/components/DropDown/styledComponents'
import FileUploadField from '../../../../Common/components/FileUploadField'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'

@observer
class ImageUploaderField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   fileUploadFieldrFieldRef: React.RefObject<any> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      // if (isFieldRequired) {
      //    return !this.fileUploadFieldrFieldRef.current?.validation()
      //       .shouldShowError
      // }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.fileUploadFieldrFieldRef.current?.validation()
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

export { ImageUploaderField }
