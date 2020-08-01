import styled from 'styled-components'
import tw from 'twin.macro'

import { TextFontP2ParagraphBasic800 } from '../../../Common/styleGuide/Typos'

import {
   RouteContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   WelcomeText,
   RightPaneContainer,
   NavigatingContainer,
   LinkText,
   ErrorText,
   Text
} from '../../styledComponents'

export const LoginRouteContainer = styled(RouteContainer)``

export const RemaindMeAndForgotPasswordContainer = styled(
   TextFontP2ParagraphBasic800
)`
   ${tw`flex justify-between items-center w-full m-0 p-0`}
`

export const SignupNavigatingContainer = styled(NavigatingContainer)``

export {
   LeftPaneContainer,
   ContentCenterWrapper,
   WelcomeText,
   RightPaneContainer,
   LinkText,
   ErrorText,
   Text
}
