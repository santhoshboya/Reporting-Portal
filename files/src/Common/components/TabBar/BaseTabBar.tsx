import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import TabItem from '../TabItem'

import { TabBarWrapper } from './styledComponents'

export interface BaseTabBarProps {
   tabs: Array<{ label: string; value: string }>
   className: string
   tabItemCss: React.CSSProperties
   selectedTabCss: React.CSSProperties
   onClickTab: (selectedTab: string) => void
   selectedTab?: string
   isInlined: boolean
   shouldRenderIcon: boolean
}

@observer
class BaseTabBar extends Component<BaseTabBarProps> {
   @observable selectedTab: string | null

   static defaultProps = {
      selectedTabCss: {},
      tabItemCss: {},
      className: ''
   }

   constructor(props: BaseTabBarProps) {
      super(props)
      this.selectedTab = null
   }

   onClickTab = (selectedTab: string) => {
      const { onClickTab } = this.props
      this.selectedTab = selectedTab
      onClickTab(this.selectedTab)
   }
   isSelectedTab = (presentTab: string, index: number): boolean => {
      const firstTabIndex = 0
      if (this.selectedTab) return this.selectedTab === presentTab
      return index === firstTabIndex
   }

   getTabStyles = (presentTab: string, index: number): React.CSSProperties => {
      const { tabItemCss, selectedTabCss } = this.props
      if (this.isSelectedTab(presentTab, index)) return selectedTabCss
      return tabItemCss
   }

   renderTabs = (): React.ReactNode => {
      const { tabs, isInlined, shouldRenderIcon } = this.props
      return (
         <>
            {tabs.map((tab, index) => (
               <TabItem
                  tab={tab}
                  onClick={this.onClickTab}
                  isSelected={this.isSelectedTab(tab.value, index)}
                  tabItemCss={this.getTabStyles(tab.value, index)}
                  isInlined={isInlined}
                  key={tab.value}
                  shouldRenderIcon={shouldRenderIcon}
               />
            ))}
         </>
      )
   }
   render() {
      const { className } = this.props
      return (
         <TabBarWrapper className={className}>
            {this.renderTabs()}
         </TabBarWrapper>
      )
   }
}
export default BaseTabBar
