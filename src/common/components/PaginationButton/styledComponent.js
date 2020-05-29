import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const PaginationBtn = styled.button`${tw`flex border border-black justify-center w-8 h-8 mr-2 focus:outline-none `}
cursor:${(props) => (props.disabled === 'true') ? 'not-allowed' : ''}
`
export { PaginationBtn }