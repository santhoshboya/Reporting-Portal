import React, { Component } from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import TextArea from './TextArea'
import './style.css'

export default {
   title: 'Forms/TextArea',
   decorators: [withKnobs]
}

interface TextAreaProps {
   containerClassName?: string
}
class TextAreaStory extends Component<TextAreaProps> {
   static defaultProps = {
      containerClassName: ''
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
      const { containerClassName } = this.props
      return (
         <TextArea
            value={value}
            onChange={this.onChange}
            placeholder={text('placeholder', 'Address')}
            validate={this.validate}
            label={text('label', 'Address')}
            disabled={boolean('disabled', false)}
            containerClassName={containerClassName}
         />
      )
   }
}

export const TextAreaStoryComponent = () => <TextAreaStory />

TextAreaStoryComponent.story = {
   decorators: [withKnobs]
}

export const TextAreaStoryComponentCustomStyle = () => (
   <TextAreaStory containerClassName={'text-area'} />
)
