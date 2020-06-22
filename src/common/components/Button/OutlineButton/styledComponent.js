import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { BaseButton } from '../BaseButton'
const OutlineButtonWrapper = styled(BaseButton)`
   background-color: red;
   ${props => (props.isDisabled ? 'color:white' : 'color:black')};
   border: 1px solid grey;
`
export { OutlineButtonWrapper }
