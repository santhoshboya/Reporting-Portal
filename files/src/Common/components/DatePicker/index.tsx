import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'styled-components/macro'
import { observable, action, computed } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//import { enGB } from 'date-fns/locale'

import { DATE_PICKER_DATE_FORMAT } from '../../constants/DateConstants'
//import { ErrorObject } from '../../utils/ValidationUtils'
import Colors from '../../themes/Colors'
import CalenderIcon from '../../icons/CalenderIcon'
import { ValidationResponseType } from '../TextInput/types'
import ErrorMessage from '../ErrorMessage'

import {
   DateContainer,
   IconWrapper,
   DatePickerAndIconWrapper
} from './styledComponents'
import './styles.css'

interface DatePickerProps extends WithTranslation {
   onSelectDate: (date: Date) => void
   containerClassName?: string
   date: Date
   validate?: () => ValidationResponseType
   disabled?: boolean
   containerCSS?: React.CSSProperties

   [x: string]: any
}
//TODO: have to update with i18n strings
//TODO: have to update with util functions
@observer
class DatePicker extends Component<DatePickerProps> {
   datePickerRef
   @observable selectedDate: string
   @observable error = ''
   @observable isActive: boolean

   static defaultProps = {
      validate: () => ({
         shouldShowError: false,
         errorMessage: ''
      }),
      disabled: false,
      showMonthDropdown: true,
      showYearDropdown: true,
      scrollableYearDropdown: true,
      dateFormat: DATE_PICKER_DATE_FORMAT
   }

   constructor(props) {
      super(props)
      this.selectedDate = props.date
      this.isActive = false
   }

   @action.bound setError(errorText: string): void {
      this.error = errorText
   }

   onBlur = (): void => {
      const { validate } = this.props
      if (validate) {
         const result = validate()
         if (result.shouldShowError) {
            this.setError(result.errorMessage)
         } else {
            this.setError('')
         }
      }
   }

   onFocus = (): void => {
      this.setError('')
   }

   @computed get isError(): boolean {
      return this.error !== ''
   }

   handleChange = (date): void => {
      const { onSelectDate } = this.props
      this.selectedDate = date
      if (onSelectDate) {
         onSelectDate(date)
      }
   }

   captureDatePickerRef = (ref): void => {
      this.datePickerRef = ref
      if (this.datePickerRef && this.datePickerRef.input) {
         this.datePickerRef.input.readOnly = true
      }
   }

   changeIsActive = () => {
      this.isActive = !this.isActive
   }

   render(): React.ReactNode {
      const {
         t,
         containerClassName,
         containerCSS,
         disabled,
         errorId,
         ...other
      } = this.props

      return (
         <DateContainer className={containerClassName} css={containerCSS}>
            <DatePickerAndIconWrapper>
               <IconWrapper>
                  <CalenderIcon
                     fill={
                        this.isActive
                           ? Colors.primary500Default
                           : Colors.basic500
                     }
                  />
               </IconWrapper>
               <ReactDatePicker
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onCalendarOpen={this.changeIsActive}
                  onCalendarClose={this.changeIsActive}
                  ref={this.captureDatePickerRef}
                  selected={this.selectedDate}
                  onChange={this.handleChange}
                  yearDropdownItemNumber={100}
                  placeholderText={'Select Date'}
                  // placeholderText={t('common:datePicker.selectDate')}
                  className={
                     !this.isError
                        ? disabled
                           ? 'dateFieldStyles dateFieldDisabled'
                           : 'dateFieldStyles'
                        : 'dateFieldStyles dateFieldStylesOnError'
                  }
                  maxDate={new Date()}
                  isClearable={!disabled}
                  disabled={disabled}
                  //locale={enGB}
                  {...other}
               />
            </DatePickerAndIconWrapper>
            {this.isError && (
               <ErrorMessage
                  errorMessage={`* ${this.error}`}
                  errorId={errorId}
               />
            )}
         </DateContainer>
      )
   }
}

export default withTranslation('translations', { withRef: true })(DatePicker)
