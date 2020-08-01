import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import { Label } from '../styledComponents'
import RadioGroup from '../../../../Common/components/RadioGroup'
import { getValuesWithLabels } from '../../../utils/FieldUtils'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'
import '../styles.css'
@observer
class RadioGroupField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   RadioButtonRef: React.RefObject<RadioGroup> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) return !this.RadioButtonRef.current?.isError
      return true
   }

   onValidate = () => {
      this.RadioButtonRef.current?.onValidate()
   }
   validate = () => plainTextValidation(this.value)
   onChangeValue = value => {
      const { onChangeFieldResponse } = this.props.fieldData
      this.value = value
      onChangeFieldResponse(value)
   }
   render() {
      const {
         isFieldWritable,
         isFieldReadable,
         displayName,
         isFieldRequired,
         fieldValues
      } = this.props.fieldTemplate
      const { fieldResponse } = this.props.fieldData
      const otherProps: any = {
         value: {
            label: fieldResponse,
            value: fieldResponse
         }
      }

      if (isFieldRequired) otherProps.validate = this.validate

      return isFieldReadable ? (
         <Fragment>
            <Label>{displayName}</Label>
            <RadioGroup
               ref={this.RadioButtonRef}
               disabled={!isFieldWritable}
               options={getValuesWithLabels(fieldValues)}
               selectedValue={fieldResponse}
               onSelectOption={this.onChangeValue}
               containerClassName={'radio-button-group-container'}
               {...otherProps}
            />
         </Fragment>
      ) : null
   }
}

export { RadioGroupField }
