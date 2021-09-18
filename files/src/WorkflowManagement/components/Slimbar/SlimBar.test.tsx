import React from 'react'
import { render } from '@testing-library/react'

import SlimBar from '.'

describe('SlimBar Component test cases', () => {
   it('should render SlimBar view', () => {
      const { getByText } = render(
         <SlimBar
            isSlimBarItemSelected={true}
            slimBarItemSelectedId={'boards'}
            sideBarView={<>SideBar View</>}
            slimBarHeaderView={<>SlimBar Header View</>}
            slimBarFooterView={<>SlimBar Footer View</>}
         />
      )

      getByText(/SlimBar Header View/)
      getByText(/SlimBar Footer View/)
      getByText(/SideBar View/)
   })
})
