import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import Button from '../Button'

// Styled Components
const Heading = tw.h1`text-2xl text-center`

const TailwindComponent = (): ReactElement => (
   <Heading>
      Hello World!! <br />I am made with love using tailwindcss
   </Heading>
)

const TailwindButton = styled(Button)`
   ${tw`bg-gray-900`}
`

storiesOf('Styles/Tailwind', module).add('tailwind heading Component', () => (
   <div tw='w-1/2 bg-gray-300 m-auto p-3 my-3 flex flex-col justify-center items-center'>
      <TailwindComponent />
      <TailwindButton>Tailwind Button</TailwindButton>
   </div>
))
