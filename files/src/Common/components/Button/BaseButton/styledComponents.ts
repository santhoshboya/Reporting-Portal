import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Colors from '../../../themes/Colors'

import { StyledButtonProps } from '../types'
import { variants } from '../constants'

export const basicVariantCss = css`
   background-color: ${Colors.basic300};
   color: ${Colors.textColorDefault};
`
export const primaryVariantCss = css`
   background-color: ${Colors.primary500Default};
   color: ${Colors.white};
`
export const successVariantCss = css`
   background-color: ${Colors.success500Default};
   color: ${Colors.white};
`
export const infoVariantCss = css`
   background-color: ${Colors.info500};
   color: ${Colors.white};
`
export const warningVariantCss = css`
   background-color: ${Colors.warning600Default};
   color: ${Colors.white};
`
export const dangerVariantCss = css`
   background-color: ${Colors.danger600Default};
   color: ${Colors.white};
`
export const controlVariantCss = css`
   background-color: ${Colors.white};
   color: ${Colors.basic800};
`
export function getVariantCss(variant) {
   const { basic, primary, success, info, warning, danger, control } = variants
   switch (variant) {
      case basic:
         return basicVariantCss
      case success:
         return successVariantCss
      case info:
         return infoVariantCss
      case warning:
         return warningVariantCss
      case danger:
         return dangerVariantCss
      case control:
         return controlVariantCss
      case primary:
      default:
         return primaryVariantCss
   }
}

export const StyledBaseButton = styled.button<StyledButtonProps>`
   display: flex;
   justify-content: center;
   opacity: ${props => (props.isLoading ? 0.6 : '')};
   cursor: ${props => (props.isLoading ? 'wait' : 'pointer')};
   width: ${props => props.width};
   height: ${props => props.height};
   ${({ variant }) => getVariantCss(variant)}
   ${props => props.shapeCss};
   ${props => props.sizeCss};
   :hover {
      opacity: 0.8;
   }
   :active {
      opacity: 1;
   }
   :focus {
      border-color: ${Colors.transparentPrimary24};
   }
   :disabled {
      cursor: not-allowed;
      background: ${Colors.transparentBasic24};
      color: ${Colors.transparentBasic48};
   }
`
