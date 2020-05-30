import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/Colors'
import {
   Typo12SteelHKGroteskSemiBoldLable,
   Typo12NeonRedHKGrotesk
} from '../../styleGuide/Typos'
const LableTag = styled(Typo12SteelHKGroteskSemiBoldLable)``
const ErrorMsgField = styled(Typo12NeonRedHKGrotesk)`
height: 16px;`
const InputWithLableDiv = styled.div`flex flex-col`
export { LableTag, InputWithLableDiv, ErrorMsgField }
