import React from 'react'
import { render } from '@testing-library/react'

import { VARIANT, AVATAR_TYPE } from './constants'
import { Avatar } from '.'

describe('Avatar', () => {
   it('Should test Cirular Avatar with INITIALS', () => {
      const { getByText } = render(
         <Avatar
            variant={VARIANT.CIRCLE}
            avatarType={AVATAR_TYPE.FILLED}
            username={'iBDeveloper'}
            src={''}
            altMessage={'iBCricket-logo'}
         />
      )
      getByText(/IB/)
   })
})
