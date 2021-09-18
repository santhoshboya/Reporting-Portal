import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import DropDownWithMultiSelect from '../../../../Common/components/DropDownWithMultiSelect'
import { getValuesWithLabels } from '../../../utils/FieldUtils'
import { multiValueValidation } from '../../../utils/ValidationUtils'
import { GofFieldType, DropDownOption } from '../types'
import '../styles.css'

@observer
class MultiSelectField extends Component<GofFieldType> {
   value: Array<string>
   multiSelectRef: React.RefObject<DropDownWithMultiSelect>

   constructor(props) {
      super(props)
      this.value = this.getJsonParseValue(this.props.fieldData.responseValue)
      this.multiSelectRef = React.createRef()
   }

   getJsonParseValue = (inputString: string): any => {
      try {
         return JSON.parse(inputString)
      } catch (error) {
         console.log('Error:', error)
         return []
      }
   }

   getJsonStringValue = (input: any): string => JSON.stringify(input)

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) return !this.multiSelectRef.current?.isError
      return true
   }

   onValidate = () => {
      this.multiSelectRef.current?.onBlur()
   }

   validate = () => {
      if (this.value != null) return multiValueValidation(this.value)
      return multiValueValidation([])
   }

   onChangeValue = (SelectedOptions: Array<DropDownOption>) => {
      const { onChangeFieldResponse } = this.props.fieldData
      const responses =
         SelectedOptions !== null
            ? SelectedOptions.map(option => option.value)
            : []
      this.value = responses
      onChangeFieldResponse(this.getJsonStringValue(responses))
   }

   getFieldValue = (responses: string) => {
      const valuesWithLabel: Array<Record<string, string>> = []
      const multipleResponses = this.getJsonParseValue(responses)

      multipleResponses.forEach(response => {
         valuesWithLabel.push({
            label: response,
            value: response
         })
      })
      return valuesWithLabel
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
      const { responseValue } = this.props.fieldData
      const otherProps: any = {}
      if (isFieldRequired) otherProps.validate = this.validate
      if (responseValue.length !== 0)
         otherProps.value = this.getFieldValue(responseValue)
      return isFieldReadable ? (
         <Fragment>
            <DropDownWithMultiSelect
               ref={this.multiSelectRef}
               labelText={displayName.toUpperCase()}
               placeholder={placeholderText}
               options={getValuesWithLabels(fieldValues)}
               isDisabled={!isFieldWritable}
               onChange={this.onChangeValue}
               className={'field-width'}
               {...otherProps}
               isMulti={true}
            />
         </Fragment>
      ) : null
   }
}

export { MultiSelectField }
