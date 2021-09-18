import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Colors from '../../../themes/Colors'

import { BaseButton } from '../BaseButton'
import { variants } from '../constants'

export const basicOutlineVariantCss = css`
   border: 2px soild ${Colors.basic600};
   background: ${Colors.transparentBasic8};
   color: ${Colors.basic600};
`
export const primaryOutlineVariantCss = css`
   border: 2px soild ${Colors.primary500Default};
   background: ${Colors.transparentPrimary8};
   color: ${Colors.primary500Default};
`
export const successOutlineVariantCss = css`
   border: 2px soild ${Colors.success500Default};
   background: ${Colors.transparentsuccess8};
   color: ${Colors.success500Default};
`
export const infoOutlineVariantCss = css`
   border: 2px soild ${Colors.info500};
   background: ${Colors.transparentInfo8};
   color: ${Colors.info500};
`
export const warningOutlineVariantCss = css`
   border: 2px soild ${Colors.warning600Default};
   background: ${Colors.transparentWarning8};
   color: ${Colors.warning600Default};
`
export const dangerOutlineVariantCss = css`
   border: 2px soild ${Colors.danger600Default};
   background: ${Colors.transparentDanger8};
   color: ${Colors.danger600Default};
`
export const controlOutlineVariantCss = css`
   border: 2px soild ${Colors.basic200};
   background: ${Colors.white8};
   color: ${Colors.basic200};
`

function getVariantCss(variant) {
   const { basic, primary, success, info, warning, danger, control } = variants
   switch (variant) {
      case basic:
         return basicOutlineVariantCss
      case success:
         return successOutlineVariantCss
      case info:
         return infoOutlineVariantCss
      case warning:
         return warningOutlineVariantCss
      case danger:
         return dangerOutlineVariantCss
      case control:
         return controlOutlineVariantCss
      default:
      case primary:
         return primaryOutlineVariantCss
   }
}

export const StyledBaseButtonAsOutline = styled(BaseButton)`
   ${({ variant }) => getVariantCss(variant)}
`
