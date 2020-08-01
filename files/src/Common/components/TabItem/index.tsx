/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Component } from 'react'

import {
   TextFontP2ParagraphBasic600,
   ButtonFontAAMediumBasic600,
   TextFontP2ParagraphPimary500Default,
   ButtonFontAAMediumPimary500Default
} from '../../styleGuide/Typos'
import StarIcon from '../../icons/StarIcon'
import { TabType } from '../types'
import { StyledButton, wrapText } from './styledComponents'

interface TabItemProps {
   tab: TabType
   isSelected: boolean
   onClick: (value: string) => void
   isInlined: boolean
   tabItemCss?: React.CSSProperties
   shouldRenderIcon: boolean
}

class TabItem extends Component<TabItemProps> {
   static defaultProps = {
      tabItemCss: {}
   }
   onClick = () => {
      const { onClick, tab } = this.props
      onClick(tab.value)
   }
   renderIcon = (): React.ReactNode | null => {
      const { shouldRenderIcon, isSelected } = this.props
      if (shouldRenderIcon) return <StarIcon isSelected={isSelected} />
      return null
   }
   renderText = (): React.ReactNode => {
      const { isInlined, isSelected } = this.props
      const displayText = this.props.tab.label
      if (isInlined) {
         if (isSelected)
            return (
               <TextFontP2ParagraphPimary500Default css={wrapText}>
                  {displayText}
               </TextFontP2ParagraphPimary500Default>
            )
         return (
            <TextFontP2ParagraphBasic600 css={wrapText}>
               {displayText}
            </TextFontP2ParagraphBasic600>
         )
      } else if (isSelected)
         return (
            <ButtonFontAAMediumPimary500Default css={wrapText}>
               {displayText}
            </ButtonFontAAMediumPimary500Default>
         )
      return (
         <ButtonFontAAMediumBasic600 css={wrapText}>
            {displayText}
         </ButtonFontAAMediumBasic600>
      )
   }

   render() {
      const { isSelected, tabItemCss, isInlined } = this.props

      return (
         <StyledButton
            isInlined={isInlined}
            onClick={this.onClick}
            css={tabItemCss}
            isSelected={isSelected}
         >
            {this.renderIcon()}
            {this.renderText()}
         </StyledButton>
      )
   }
}

export default TabItem
