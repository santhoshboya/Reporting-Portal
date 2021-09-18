import styled, { css } from 'styled-components'

import { mobile } from '../../utils/MixinUtils'
import { TextFontP2ParagraphBasic800 } from '../../styleGuide/Typos'

export const MainContainer = styled.div`
   ${mobile} {
      margin-top: 8px;
   }
`
export const RadioGroupLabel = styled(TextFontP2ParagraphBasic800)`
   margin-bottom: 5px;
`

export const RadioGroupContainer = styled.div`
   display: flex;
   flex-direction: column;
`

export const radioGroupContainerCss = css`
   background-color: red;
`
