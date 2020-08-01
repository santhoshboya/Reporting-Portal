import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'

import SearchableDropDownComponent from '../../../../Common/components/APIsearchableDropDown/'
import { plainTextValidation } from '../../../utils/ValidationUtils'
import { GofFieldType } from '../types'
import '../styles.css'

@observer
class SearchableField extends Component<GofFieldType> {
   value: string = this.props.fieldData.fieldResponse
   searchableFieldRef: React.RefObject<any> = React.createRef()

   isFieldValid = () => {
      const { isFieldRequired } = this.props.fieldTemplate
      if (isFieldRequired) {
         const isFieldValid = !this.searchableFieldRef.current?.searchableRef
            .current?.isError
         return isFieldValid
      }
      return true
   }

   onValidate = () => {
      this.searchableFieldRef.current?.searchableRef.current?.onBlur()
   }

   onChangeValue = (value, id) => {
      const { onChangeFieldResponse } = this.props.fieldData
      this.value = value
      onChangeFieldResponse(value)
   }
   validate = () => plainTextValidation(this.value)
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

      const inputProps: any = {
         disabled: !isFieldWritable,
         onChange: this.onChangeValue,
         validate: this.validate
      }

      if (isFieldRequired) inputProps.validate = this.validate
      if (fieldResponse !== '')
         inputProps.value = {
            value: fieldResponse,
            label: fieldResponse
         }

      return isFieldReadable ? (
         <Fragment>
            <SearchableDropDownComponent
               ref={this.searchableFieldRef}
               url={fieldValues}
               placeholder={placeholderText}
               className={'field-width'}
               labelText={displayName.toUpperCase()}
               {...inputProps}
            />
         </Fragment>
      ) : null
   }
}

export { SearchableField }
