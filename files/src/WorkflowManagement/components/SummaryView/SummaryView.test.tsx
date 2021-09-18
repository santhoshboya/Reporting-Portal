import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SummaryView from '.'

describe('SummaryView tests', () => {
   it('should test if onClick summary view arrow opens summary view details', () => {
      const { getByText } = render(<SummaryView />)

      fireEvent.click(getByText('Summary'))

      getByText('Total Amount')
   })
})
