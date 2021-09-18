import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import DropDown from '../../../../Common/components/DropDown'
import { getValuesWithLabels } from '../../../utils/FieldUtils'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'
import '../styles.css'

@observer
class GofSelectorField extends Component<GofFieldType> {
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
   getValuesWithLabels = fieldValues => {
      const options = fieldValues.map(field => field.name)
      return getValuesWithLabels(options)
   }
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

      return isFieldReadable ? (
         <Fragment>
            <DropDown
               ref={this.dropDownFieldRef}
               label={displayName.toUpperCase()}
               placeholder={placeholderText}
               options={this.getValuesWithLabels(fieldValues)}
               isDisable={!isFieldWritable}
               value={{ label: fieldResponse, value: fieldResponse }}
               onChange={this.onChangeValue}
               className={'field-width'}
               {...otherProps}
            />
         </Fragment>
      ) : null
   }
}

export { GofSelectorField }
