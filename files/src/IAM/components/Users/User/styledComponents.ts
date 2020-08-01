import tw, { styled } from 'twin.macro'

import { TextFontC2CaptionBasic1000 } from '../../../../Common/styleGuide/Typos'

export const Thead = styled.thead`
   ${tw``};
`

export const TableRow = styled(TextFontC2CaptionBasic1000)`
   ${tw`h-12 bg-white text-gray-600`};
   border-bottom: 1px solid #ddd;
   &:hover {
      ${tw`bg-gray-200`}
   }
`

export const TableData = styled.td`
   ${tw`px-4 py-2`};
   color: 'gray';
`
export const DataLink = styled.span`
   ${tw`bg-indigo-100 text-blue-600`};
   padding: 2px;
`
export const Wrapper = styled.div`
   ${tw`py-2`}
`
interface OptionsContanerProps {
   canDislayOptions: boolean
}

export const OptionsContaner = styled(TableData)<OptionsContanerProps>`
   ${tw`flex-1 flex justify-around items-center text-center mt-4`}
   opacity:${props => (props.canDislayOptions ? 1 : 0)};
   pointer-events:${props => (props.canDislayOptions ? 'auto' : 'none')};
   cursor:pointer;
`
export const Icon = styled.span``
