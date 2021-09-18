import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
   PLAIN_TEXT,
   PHONE_NUMBER,
   EMAIL,
   PASSWORD,
   NUMBER,
   FLOAT,
   LONG_TEXT,
   RADIO_GROUP,
   CHECKBOX_GROUP,
   DROPDOWN,
   MULTI_SELECT_FIELD,
   DATE,
   IMAGE_UPLOADER,
   FILE_UPLOADER,
   SEARCHABLE,
   GOF_SELECTOR,
   URL_TEXT
} from '../../constants/FieldTypesConstants'

import PlainTextField from './PlainTextField'
import PhoneNumberField from './PhoneNumberField'
import EmailField from './EmailField'
import UrlField from './UrlField'
import PasswordField from './PasswordField'
import NumberField from './NumberField'
import FloatField from './FloatField'
import LongTextField from './LongTextField'
import RadioGroupField from './RadioGroupFeild'
import CheckBoxGroupField from './CheckBoxGroupField'
import DropDownField from './DropDownField'
import MultiSelectorField from './MultiSelectField'
import DateField from './DateField'
import ImageUploaderField from './ImageUploaderField'
import SearchableField from './SearchableField'
import GofSelectorField from './GofSelectorField'
import FileUploaderField from './FileUploaderField'
import { FieldProps } from './types'
import { FieldWrapper } from './styledComponents'
@observer
class Field extends Component<FieldProps> {
   fieldRef: React.RefObject<any> = React.createRef()
   isFieldValid = () => this.fieldRef.current?.isFieldValid()
   validateField = () => {
      this.fieldRef.current?.onValidate()
   }

   renderField = () => {
      const { fieldType } = this.props.fieldTemplate
      const { fieldData, fieldTemplate } = this.props
      switch (fieldType) {
         case PLAIN_TEXT:
            return (
               <PlainTextField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case PHONE_NUMBER:
            return (
               <PhoneNumberField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case EMAIL:
            return (
               <EmailField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case URL_TEXT:
            return (
               <UrlField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case PASSWORD:
            return (
               <PasswordField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )

         case NUMBER:
            return (
               <NumberField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )

         case FLOAT:
            return (
               <FloatField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )

         case LONG_TEXT:
            return (
               <LongTextField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case RADIO_GROUP:
            return (
               <RadioGroupField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case CHECKBOX_GROUP:
            return (
               <CheckBoxGroupField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case DROPDOWN:
            return (
               <DropDownField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case MULTI_SELECT_FIELD:
            return (
               <MultiSelectorField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case DATE:
            return (
               <DateField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case IMAGE_UPLOADER:
            return (
               <ImageUploaderField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case FILE_UPLOADER:
            return (
               <FileUploaderField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case SEARCHABLE:
            return (
               <SearchableField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
         case GOF_SELECTOR:
            return (
               <GofSelectorField
                  ref={this.fieldRef}
                  fieldData={fieldData}
                  fieldTemplate={fieldTemplate}
               />
            )
      }
      return null
   }
   render() {
      return <FieldWrapper>{this.renderField()}</FieldWrapper>
   }
}

export { Field }
