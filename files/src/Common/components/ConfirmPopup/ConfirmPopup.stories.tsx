import React from 'react'

import { addParameters } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'

import ConfirmPopup from '.'

const instruction =
   'Use this Popup feature to implement Confirmation MEssage as popup before doing some actions like Before logging out or Navigations from one route to another'
addParameters({ notes: instruction })

export default {
   component: ConfirmPopup,
   title: 'ConfirmPopup',
   decorators: [withKnobs]
}

export const Popup = () => (
   <ConfirmPopup
      onConfirm={action('confirm')}
      onClose={action('close')}
      onCancel={action('cancel')}
      message={'Please Confirm?'}
      cancelText='cancel'
      confirmText='Proceed'
   />
)
