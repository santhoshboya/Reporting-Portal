import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import LayoutWithSideBar from '.'

describe('LayoutWithSideBar component test cases', () => {
   it('should render the given layout with sidebar', () => {
      const { getByText } = render(
         <LayoutWithSideBar sideBarView={<div>slimbar</div>}>
            <div>
               <p>Main section</p>
            </div>
         </LayoutWithSideBar>
      )

      getByText(/Main section/)
   })
})
