import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { tabBarTypes } from '../../constants/TabBarConstants'

export const TABS = [
   { label: 'Item1', value: 'item1' },
   { label: 'Item2', value: 'item2' },
   { label: 'Item3', value: 'item3' },
   { label: 'Item4', value: 'item4' }
]

import TabBar from '.'

storiesOf('TabBar', module)
   .add('default Tabbar', () => (
      <TabBar
         tabs={TABS}
         onClickTab={action('onClickTab')}
         type={tabBarTypes.default}
      />
   ))
   .add('TabBar without Icon', () => (
      <TabBar
         tabs={TABS}
         onClickTab={action('onClickTab')}
         type={tabBarTypes.withoutIcon}
      />
   ))
   .add('Inlined Tabbar', () => (
      <TabBar
         tabs={TABS}
         onClickTab={action('onClickTab')}
         type={tabBarTypes.inlined}
      />
   ))
