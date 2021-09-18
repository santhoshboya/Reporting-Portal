import React, { Component, ReactElement } from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import styled from '@emotion/styled'

import TextInput from '.'
import './style.css'

export default {
   title: 'Forms/InputBox',
   decorators: [withKnobs]
}

const TextInputTypo = styled.input`
   background-color: lightyellow;
   flex-grow: 1;
   padding: 14px;
   border: none;
   font-size: 16px;
`
interface InputBoxProps {
   customClassName?: string
   inputTypo?: any
}
class InputBox extends Component<InputBoxProps> {
   static defaultProps = {
      customClassName: '',
      inputTypo: undefined
   }
   state = { value: '' }

   onChange = (event: any) => {
      this.setState({
         value: event.target.value
      })
   }

   validate = () => {
      const { value } = this.state

      if (value === '') {
         return { shouldShowError: true, errorMessage: 'required' }
      }
      return {
         shouldShowError: false,
         errorMessage: ''
      }
   }

   render() {
      const { value } = this.state
      const { customClassName, inputTypo } = this.props
      return (
         <TextInput
            value={value}
            onChange={this.onChange}
            placeholder={text('placeholder', 'Full Name')}
            validate={this.validate}
            label={text('label', 'Full Name')}
            disabled={boolean('disabled', false)}
            containerClassName={customClassName}
            inputTypo={inputTypo}
         />
      )
   }
}

export const textInput = () => <InputBox />
textInput.story = {
   decorators: [withKnobs]
}

export const textInputCustomStyling = () => (
   <InputBox customClassName={'text-input'} inputTypo={TextInputTypo} />
)
