import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../../common/themes/Colors'
import {
   Typo32DarkBlueGreyRubikRegular,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../common/styleGuide/Typos'
const SignInFornDiv = styled.div`
   ${tw`flex flex-col items-center`}
   width: 536px;
   height: 687px;
   background-color: ${colors.white};
   height: 80%;
`
const SignUpSpan = styled.a`
   color: ${colors['bright-blue']};
`
const GreetingMessage = styled(Typo32DarkBlueGreyRubikRegular)`
   ${tw`flex justify-center text-center mb-8`}
   width:214px;
   height:80px;
`
const SignUpLink = styled(Typo14DarkBlueGreyHKGroteskRegular)``

export { SignInFornDiv, GreetingMessage, SignUpLink, SignUpSpan }
