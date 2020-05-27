import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/Colors'
const TextAreaElement = styled.textarea`
   ${tw``}
   border-radius: 2px;
   border: solid 1px ${colors['light-blue-grey']};
   background-color: ${colors.white};
`
export { TextAreaElement }
