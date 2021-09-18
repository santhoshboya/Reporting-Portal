/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import { observer } from 'mobx-react'
import 'twin.macro'

import i18n from '../../i18n'
import './index.css'
import {
   CardContainer,
   CardContainerWithShadow,
   CardWrapper
} from './styledComponents'

interface CardProps {
   onClick?: () => any
   className?: string
   testId?: string
   cardCss?: React.CSSProperties
   enableShadow: boolean
   shadowWidth: number
}

@observer
class Card extends React.Component<CardProps> {
   static defaultProps = {
      onClick: () => {},
      testId: i18n.t('common:card.card'),
      shadowWidth: 2,
      enableShadow: false
   }

   getCard = () => {
      const {
         enableShadow,
         onClick,
         className,
         children,
         testId,
         cardCss,
         shadowWidth,
         ...otherProps
      } = this.props

      if (enableShadow) {
         return (
            <CardContainerWithShadow
               onClick={onClick}
               data-testid={testId}
               className={className}
               css={cardCss}
               shadowWidth={shadowWidth}
               {...otherProps}
            >
               {children}
            </CardContainerWithShadow>
         )
      }
      return (
         <CardContainer
            onClick={onClick}
            data-testid={testId}
            className={className}
            css={cardCss}
            {...otherProps}
         >
            {children}
         </CardContainer>
      )
   }
   render() {
      return <CardWrapper>{this.getCard()}</CardWrapper>
   }
}

export default Card
