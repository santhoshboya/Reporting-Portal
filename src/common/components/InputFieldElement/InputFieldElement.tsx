import React, { Component } from 'react'

import {
   InputElement,
   InputElementWrapper,
   ErrorMsgSpan
} from './styledComponent'

import { observer } from 'mobx-react'

import { observable } from 'mobx'

type InputFieldProps = {
   type: string
   testid?: string
   onChange: (value: string) => void
   placeHolder?: string
   className?: string
   onBlur?: (value: string) => void
   validateForm: (
      value: string
   ) => { shouldShowErrorMessage: boolean; errorMessage: string }
}

@observer
class InputFieldElement extends Component<InputFieldProps> {
   @observable value
   @observable shouldShowErrorMessage
   @observable errorMessage
   static defaultProps = {
      onChange: () => {}
   }
   onChange = event => {
      this.value = event.target.value
      if (this.value) {
         this.shouldShowErrorMessage = true
         this.errorMessage = '*Required'
      }
   }
   onBlur = event => {
      const { shouldShowErrorMessage, errorMessage } = this.props.validateForm(
         this.value
      )
      this.shouldShowErrorMessage = shouldShowErrorMessage
      this.errorMessage = errorMessage
   }
   render() {
      const { testid, placeHolder, className } = this.props
      return (
         <InputElementWrapper>
            <InputElement
               value={this.value}
               onChange={this.onChange}
               placeholder={placeHolder}
               className={className}
               data-testid={testid}
               onBlur={this.onBlur}
            ></InputElement>
            {this.shouldShowErrorMessage && (
               <ErrorMsgSpan>{this.errorMessage}</ErrorMsgSpan>
            )}
         </InputElementWrapper>
      )
   }
}
export { InputFieldElement }
