import styled from 'styled-components'
import tw from 'twin.macro'

import {
   TextFontH3HeadlineBasic1000,
   TextFontP2ParagraphPimary500Default,
   TextFontC1CaptionDanger500,
   TextFontP2ParagraphBasic1000,
   TextFontS1SubtitleSuccess500Default
} from '../../Common/styleGuide/Typos'

export const RouteContainer = styled.div`
   ${tw`h-full flex`}
`

export const LeftPaneContainer = styled.div`
   ${tw`h-full flex-1 flex justify-center items-center`}
`

export const ContentCenterWrapper = styled.form`
   ${tw`flex flex-col items-center justify-center p-16 m-4 rounded-lg`}
   box-shadow:1px 1px 10px lightgrey;
   /* TODO: Refactor these styles into tailwind */
   & > * {
      margin: 10px 0px;
   }
`
export const WelcomeText = styled(TextFontH3HeadlineBasic1000)`
   ${tw`text-center`}
`

export const RightPaneContainer = styled.div`
   ${tw`h-full p-16 w-5/12 flex flex-col justify-center items-center bg-extraPurple200 text-extraPurple700`}
`

export const NavigatingContainer = styled.div`
   ${tw`flex justify-center items-center mt-16`}
`

export const LinkText = styled(TextFontP2ParagraphPimary500Default)``
export const SuccessText = styled(TextFontS1SubtitleSuccess500Default)``
export const ErrorText = styled(TextFontC1CaptionDanger500)``
export const Text = styled(TextFontP2ParagraphBasic1000)``
