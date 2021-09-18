import styled from '@emotion/styled'
import tw from 'twin.macro'

import { ButtonFontAAMediumPimary500Default } from '../../styleGuide/Typos'
import colors from '../../themes/Colors'

export const UiWrapper = styled.div`
   width: 320px;
   height: 88px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-style: dashed;
   border-color: ${colors.basic1000};
   border-width: 1px;

   ${tw`cursor-pointer`};
   &:hover {
      border-color: gray;
   }
`

export const FileName = styled.p`
   padding: 5px 20px;
`

export const SampleUiWrapper = styled.div`
   width: 200px;
   height: 200px;
   display: flex;
   justify-content: center;
   border-style: solid;
   align-items: center;
   border-radius: 50%;
   border-color: lightgray;
   border-width: 1px;

   ${tw`cursor-pointer`};
   &:hover {
      border-color: gray;
   }
`

export const Image = styled.img``

export const FailureViewWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
export const UploadFieldDescription = styled(
   ButtonFontAAMediumPimary500Default
)`
   padding: 7px 14px;
   border-radius: 4px;
   border: 2px solid ${colors.primary500Default};
   background-color: ${colors.transparentPrimary8};
`

export const ProgressBarWrapper = styled.div`
   width: 250px;
`

export const RetryButton = styled.button`
   color: red;
   background-color: transparent;
   font-size: 12px;
`

export const DownloadButton = styled.button`
   background-color: transparent;
   font-size: 12px;
`

export const SuccessViewWrapper = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
