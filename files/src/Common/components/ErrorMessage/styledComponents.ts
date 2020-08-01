import styled, { css } from 'styled-components'

import { Typo16PinkishOrangeRoboto } from '../../styleGuide/Typos'

export const ErrorView = styled.div``

export const ErrorMessageContainer = styled(Typo16PinkishOrangeRoboto)`
   line-height: 2.03;
   letter-spacing: 0.11px;
   pointer-events: none;
`

export const containerCSS = css`
   flex-direction: row;
   margin-top: 3px;
   margin-left: 3px;
`
