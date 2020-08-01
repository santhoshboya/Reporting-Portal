import React from 'react'
import { render } from '@testing-library/react'

import SideBarCollapsedView from '.'

describe('CollapsedHeaderView Component test cases', () => {
   it('should test rendering CollapsedHeaderView', () => {
      const { getByTestId } = render(<SideBarCollapsedView />)

      getByTestId('sideBarCollapsedView')
   })
})
