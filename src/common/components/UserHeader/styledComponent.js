import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const UserHeaderDiv = styled.div`
   ${tw`w-screen`}
   height: 80px;
   border: solid 1px #d7dfe9;
   background-color: #ffffff;
`
const LeftPart = styled.div`
   ${tw`flex`}
`
const RightPart = styled.div`
   ${tw`flex`}
`
export { UserHeaderDiv, LeftPart, RightPart }
