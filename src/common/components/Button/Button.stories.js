import React from 'react'
import '../../../styles/tailwind.css'
import styled from '@emotion/styled'
const TextTypo = styled.span``
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Button } from './Button'
export default {
   component: Button,
   title: 'Button/CommonButton'
}

export const buttonDefaultView = () => (
   <Button
      text={'Submit'}
      textTypo={TextTypo}
      isDisabled={false}
      type={'OUTLINE'}
      varient={Button.buttonVarients.oval}
      onClick={action('Submit')}
   />
)

export const knobs = () => (
   <Button
      text={text('ButtonName', 'Submit')}
      textTypo={TextTypo}
      onClick={action('Submit')}
      isDisabled={boolean('isDisable', false)}
      type={text('Type', Button.buttonTypes.outline)}
      varient={text('Varient', Button.buttonVarients.oval)}
   />
)

knobs.story = {
   decorators: [withKnobs]
}
