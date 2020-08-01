import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'

import colors from '../../themes/Colors'
import { cardCss } from './styledComponents'
import Card from '.'

const ProgramCard = styled(Card)`
   height: 160px;
   width: 200px;
   background-color: ${colors.blueyGrey};
`

storiesOf('Component Guide', module)
   .add('Card Component', () => (
      <Card onClick={action('clicked card')} enableShadow={false} />
   ))
   .add('Card Component with shadow', () => (
      <Card onClick={action('clicked card')} enableShadow={true} />
   ))
   .add('Card Component with css styles', () => (
      <Card
         cardCss={cardCss}
         onClick={action('clicked card')}
         enableShadow={false}
      />
   ))
   .add('Card Component with styles and shadow', () => (
      <Card
         enableShadow={true}
         className={'card-component '}
         onClick={action('clicked card')}
         shadowWidth={15}
      />
   ))
   .add('ProgramCard Component', () => (
      <ProgramCard onClick={action('clicked ProgramCard')} enableShadow={true}>
         <span>hello</span>
      </ProgramCard>
   ))
