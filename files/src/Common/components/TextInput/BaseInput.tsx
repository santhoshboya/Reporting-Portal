import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import AlertCircleIcon from '../../icons/AlertCircleIcon'
import ErrorMessage from '../ErrorMessage'
import { InputProps } from './types'
import { TEXT_AREA } from './constants'
import {
   Input,
   InputContainer,
   Label,
   InputWrapper,
   IconWrapper
} from './styledComponents'

@observer
class BaseInput extends Component<InputProps> {
   inputRef

   constructor(props) {
      super(props)
      this.inputRef = React.createRef()
   }

   static defaultProps = {
      validate: () => ({ shouldShowError: false, errorMessage: '' }),
      shouldValidateOnBlur: true,
      label: '',
      inputTypo: Input
   }

   @observable error = ''

   @action setError(errorText: string) {
      this.error = errorText
   }

   validateInput = () => {
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

   onBlur = () => {
      const { shouldValidateOnBlur } = this.props
      if (shouldValidateOnBlur) {
         this.validateInput()
      }
   }

   onFocus = () => {
      this.setError('')
   }

   focus = () => {
      this.inputRef.current.focus()
   }

   isError = () => this.error !== ''

   renderLabel = () => {
      const { label } = this.props

      if (label !== '' && label) {
         const upperCaseLabel = label.toUpperCase()
         return <Label>{upperCaseLabel}</Label>
      }
      return null
   }

   renderAlertIcon = () => {
      const { tagName } = this.props
      return tagName !== TEXT_AREA ? (
         <IconWrapper>
            <AlertCircleIcon />
         </IconWrapper>
      ) : null
   }

   render() {
      const isValid = !this.isError()
      const {
         containerClassName,
         errorId,
         inputTypo: InputElement,
         ...otherProps
      } = this.props
      return (
         <InputContainer className={containerClassName}>
            {this.renderLabel()}
            <InputWrapper>
               <InputElement
                  ref={this.inputRef}
                  data-testid='input'
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  isValid={isValid}
                  {...otherProps}
               />
               {this.isError() ? this.renderAlertIcon() : null}
            </InputWrapper>
            {this.isError() ? (
               <ErrorMessage errorId={errorId} errorMessage={this.error} />
            ) : null}
         </InputContainer>
      )
   }
}

export default BaseInput
