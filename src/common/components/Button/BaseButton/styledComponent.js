import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const BaseButtonWrapper = styled.button`
   ${tw``}
   background-color:${props => (props.isDisabled ? 'grey' : 'blue')};
   cursor:${props => {
      props.isDisabled ? 'pointer' : 'none'
   }};
   ${props => props.css}
   ${props => (props.isDisabled ? 'color:white' : 'color:black')}
`

export { BaseButtonWrapper }
