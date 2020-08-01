import React from 'react'
import { storiesOf } from '@storybook/react'

import Toaster from '.'

storiesOf('Toaster', module)
   .add('Toaster with Title and Message', () => (
      <Toaster
         title='Infinity Stones Acquired'
         message='Infinity Stones Acquired'
         type='DARK'
      />
   ))
   .add('Toaster with Message', () => (
      <Toaster message='Infinity Stones Acquired' type='DARK' />
   ))
