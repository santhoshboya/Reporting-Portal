import styled from 'styled-components'
import tw, { css } from 'twin.macro'
export const CardContainer = styled('div')`
   border-radius: 0.278em;
`
export const CardWrapper = styled('div')`
   ${tw`p-1`}
`
export const CardContainerWithShadow = styled('div')`
   border-radius: 0.278em;
   box-shadow: ${props => props.shadowWidth}px ${props => props.shadowWidth}px
      ${props => props.shadowWidth}px ${props => props.shadowWidth}px
      rgba(176, 203, 234, 0.24);
`

export const cardCss = css`
   background-color: blue;
   height: 100px;
   width: 100px;
   ${tw`text-black`};
`
