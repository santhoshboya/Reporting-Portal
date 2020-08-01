import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import CheckboxGroup from '../../../../Common/components/CheckBoxGroup'
import { getValuesWithLabels } from '../../../utils/FieldUtils'
import { multiValueValidation } from '../../../utils/ValidationUtils'
import { Label } from '../styledComponents'
import { GofFieldType } from '../types'
import '../styles.css'

@observer
class CheckBoxGroupField extends Component<GofFieldType> {
   value: Array<string>
   checkboxGroupFieldRef: React.RefObject<CheckboxGroup>
   constructor(props) {
      super(props)
      this.value = this.getJsonParseValue(this.props.fieldData.responseValue)
      this.checkboxGroupFieldRef = React.createRef()
   }

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         return !this.checkboxGroupFieldRef.current?.isError
      }
      return true
   }

   onValidate = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         this.checkboxGroupFieldRef.current?.onValidate()
      }
   }

   validate = () => multiValueValidation(this.value)

   getJsonParseValue = (inputString: string): any => {
      try {
         return JSON.parse(inputString)
      } catch (error) {
         console.log('Error:', error)
         return []
      }
   }

   getJsonStringValue = (input: any): string => JSON.stringify(input)

   handleOnChange = (value: string) => {
      const { onChangeFieldResponse } = this.props.fieldData
      if (this.value.find(each => each === value)) {
         this.value = this.value.filter(each => each !== value)
      } else {
         this.value.push(value)
      }
      const responseValue = this.getJsonStringValue(this.value)
      onChangeFieldResponse(responseValue)
   }

   render() {
      const {
         isFieldWritable,
         fieldValues,
         isFieldReadable,
         displayName,
         isFieldRequired
      } = this.props.fieldTemplate
      const { responseValue } = this.props.fieldData
      const otherProps: any = {}
      if (isFieldRequired) otherProps.validate = this.validate
      return isFieldReadable ? (
         <Fragment>
            <Label>{displayName.toUpperCase()}</Label>
            <CheckboxGroup
               ref={this.checkboxGroupFieldRef}
               disabled={!isFieldWritable}
               options={getValuesWithLabels(fieldValues)}
               selectedValues={responseValue}
               onChange={this.handleOnChange}
               containerClassName={'checkbox-group-container'}
               {...otherProps}
            />
         </Fragment>
      ) : null
   }
}

export { CheckBoxGroupField }
