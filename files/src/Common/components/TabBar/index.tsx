import React, { Component } from 'react'

import { tabBarTypes } from '../../constants/TabBarConstants'
import BaseTabBar from './BaseTabBar'

export interface TabBarProps {
   tabs: Array<{ label: string; value: string }>
   className?: string
   tabItemCss?: React.CSSProperties
   selectedTabCss?: React.CSSProperties
   onClickTab: (selectedTab: string) => void
   type: string
   selectedTab?: string
}

class TabBar extends Component<TabBarProps> {
   render() {
      const { type, ...otherProps } = this.props
      switch (type) {
         case tabBarTypes.inlined:
            return (
               <BaseTabBar
                  {...otherProps}
                  isInlined={true}
                  shouldRenderIcon={true}
               />
            )
         case tabBarTypes.default:
            return (
               <BaseTabBar
                  {...otherProps}
                  isInlined={false}
                  shouldRenderIcon={true}
               />
            )
         case tabBarTypes.withoutIcon:
            return (
               <BaseTabBar
                  {...otherProps}
                  isInlined={true}
                  shouldRenderIcon={false}
               />
            )
         default:
            console.warn('Invalid TabBar Type.')
      }
   }
}

export default TabBar
