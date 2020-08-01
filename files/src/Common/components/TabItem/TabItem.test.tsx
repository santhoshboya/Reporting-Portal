import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TabItem from '.'

export const TABS = [
   { label: 'Item1', value: 'item1' },
   { label: 'Item2', value: 'item2' },
   { label: 'Item3', value: 'item3' },
   { label: 'Item4', value: 'item4' }
]

describe('TabItem test cases', () => {
   it('should render the TabItem', () => {
      const onClick = jest.fn()
      const { getByText } = render(
         <TabItem
            onClick={onClick}
            tab={TABS[0]}
            isSelected={false}
            isInlined={false}
            shouldRenderIcon={true}
         />
      )
      getByText(TABS[0].label)
   })
   it('should callback with the selected TabItem value onclick', () => {
      const onClick = jest.fn()
      const { getByRole } = render(
         <TabItem
            onClick={onClick}
            tab={TABS[0]}
            isSelected={false}
            isInlined={false}
            shouldRenderIcon={true}
         />
      )
      const tabItem = getByRole('button', { name: TABS[0].label })
      fireEvent.click(tabItem)
      expect(onClick).toBeCalledWith(TABS[0].value)
   })
})
