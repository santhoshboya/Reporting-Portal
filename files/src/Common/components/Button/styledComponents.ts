import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { shapes, sizes } from './constants'

export const rectangularShapeCss = css`
   border-radius: 4px;
`
export const pillShapeCss = css`
   border-radius: 25px;
`
export const roundShapeCss = css`
   border-radius: 50%;
`

export const tinySizeCss = css`
   font-size: 10px;
   padding: 4px 8px;
`
export const smallSizeCss = css`
   font-size: 12px;
   padding: 8px 16px;
`
export const mediumSizeCss = css`
   font-size: 14px;
   padding: 12px 24px;
`
export const largeSizeCss = css`
   font-size: 16px;
   padding: 16px 32px;
`

export function getShapeCss(shape) {
   const { rectangular, pill, round } = shapes
   switch (shape) {
      case pill:
         return pillShapeCss
      case round:
         return roundShapeCss
      case rectangular:
      default:
         return rectangularShapeCss
   }
}

export function getSizeCss(size) {
   const { tiny, small, medium, large } = sizes
   switch (size) {
      case large:
         return largeSizeCss
      case medium:
         return mediumSizeCss
      case tiny:
         return tinySizeCss
      case small:
      default:
         return smallSizeCss
   }
}

export const FlexRowContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   flex-direction: row;
   & > * {
      margin: 5px;
   }
`
