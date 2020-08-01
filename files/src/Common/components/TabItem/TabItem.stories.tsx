import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TabItem from '.'

export const TABS = [
   { label: 'Item1', value: 'item1' },
   { label: 'Item2', value: 'item2' },
   { label: 'Item3', value: 'item3' },
   { label: 'Item4', value: 'item4' }
]

storiesOf('TabItem', module)
   .add('default TabItem', () => (
      <TabItem
         tab={TABS[0]}
         onClick={action('onClickTab')}
         isSelected={false}
         isInlined={false}
         shouldRenderIcon={true}
      />
   ))
   .add('inlined TabItem', () => (
      <TabItem
         tab={TABS[0]}
         onClick={action('onClickTab')}
         isSelected={false}
         isInlined={true}
         shouldRenderIcon={true}
      />
   ))
   .add('TabItem without Icon', () => (
      <TabItem
         tab={TABS[0]}
         onClick={action('onClickTab')}
         isSelected={false}
         isInlined={false}
         shouldRenderIcon={false}
      />
   ))
   .add('TabItem with text overflow', () => (
      <TabItem
         tab={{
            label: 'The text is truncated when it is too long',
            value: 'tabitem4'
         }}
         onClick={action('onClickTab')}
         isSelected={false}
         isInlined={false}
         shouldRenderIcon={true}
      />
   ))
