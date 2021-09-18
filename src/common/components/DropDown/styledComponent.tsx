import styled from '@emotion/styled'
import tw from 'tailwind.macro'
const SelectElement = styled.select`
   ${tw`outline-none`}
   height: 40px;
   border-radius: 2px;
   border: solid 1px #d7dfe9;
   padding-right: 30px;
`
const SlectOptions = styled.option`
   ${tw``};
`
export { SelectElement, SlectOptions }
