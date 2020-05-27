import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { colors } from '../../themes/Colors'
const InputElement = styled.input`
   ${tw``}
   height: 40px;
   width: 320px;
   border-radius: 2px;
   border: solid 1px ${colors['light-blue-grey']};
   background-color: ${colors.white};
`
export { InputElement }
