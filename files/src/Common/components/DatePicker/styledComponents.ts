import styled from 'styled-components'

import { mobile } from '../../utils/MixinUtils'

export const DateContainer = styled('div')`
   width: 320px;
   ${mobile} {
      margin-top: 8px;
   }
   flex-direction: column;
   display: flex;
   position: relative;
`

export const DatePickerAndIconWrapper = styled('div')`
   position: relative;
`

export const IconWrapper = styled('div')`
   z-index: 1;
   display: flex;
   position: absolute;
   top: 0px;
   bottom: 0px;
   margin-left: 10px;
   align-items: center;
`

export const ErrorWrapper = styled('div')``
