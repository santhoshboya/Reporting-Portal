import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { tabBarTypes } from '../../constants/TabBarConstants'

import TabBar from '.'

export const TABS = [
   { label: 'Item1', value: 'item1' },
   { label: 'Item2', value: 'item2' },
   { label: 'Item3', value: 'item3' },
   { label: 'Item4', value: 'item4' }
]

describe('TabBar component test cases', () => {
   it('should render the component', () => {
      const onClickTab = jest.fn()
      const { getByText } = render(
         <TabBar
            tabs={TABS}
            onClickTab={onClickTab}
            type={tabBarTypes.default}
         />
      )
      getByText(TABS[0].label)
      getByText(TABS[1].label)
      getByText(TABS[2].label)
      getByText(TABS[3].label)
   })
   it('should callback with selected tab on click tabItem', () => {
      const onClickTab = jest.fn()
      const { getByRole } = render(
         <TabBar
            tabs={TABS}
            onClickTab={onClickTab}
            type={tabBarTypes.inlined}
         />
      )
      const tabItem1 = getByRole('button', { name: TABS[2].label })
      const tabItem2 = getByRole('button', { name: TABS[0].label })

      fireEvent.click(tabItem1)
      expect(onClickTab).toBeCalledWith(TABS[2].value)

      fireEvent.click(tabItem2)
      expect(onClickTab).toBeCalledWith(TABS[0].value)
   })
})
