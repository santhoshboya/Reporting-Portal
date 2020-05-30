import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const PaginationBtn = styled.button`${tw`flex border border-black justify-center w-8 h-8 mr-2 `}
cursor:${(props) => (props.disabled === true) ? 'not-allowed' : ''};
border: solid 1px #d7dfe9;
`
export { PaginationBtn }