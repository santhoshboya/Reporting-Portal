import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/Colors'
const InputElement = styled.input`
   ${tw`outline-none`}
   padding-left:5px;
`
const InputElementWrapper = styled.div``
const ErrorMsgSpan = styled.span`
color:red`
export { InputElement, InputElementWrapper, ErrorMsgSpan }
