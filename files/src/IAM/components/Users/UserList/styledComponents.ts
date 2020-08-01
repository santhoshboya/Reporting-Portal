import tw, { styled } from 'twin.macro'

import { TextFontC2CaptionBasic1000 } from '../../../../Common/styleGuide/Typos'

export const UserListWrapper = styled.div`
   ${tw`flex`};
`

export const Table = styled.table`
   ${tw`text-left border border-gray-300 border-solid rounded m-4`};
   border-collapse: collapse;
   flex: 1;
   & th,
   td {
      flex: 1;
   }
`
export const Thead = styled.thead`
   ${tw``};
`

export const TableHeading = styled.th`
   ${tw`p-2`};
   border-bottom: 1px solid #ddd;
   font-size: 12px;
   color: 'gray';
`

export const TableRow = styled(TextFontC2CaptionBasic1000)`
   ${tw`h-16 bg-white text-gray-600`};
   border-bottom: 1px solid #ddd;
   &:hover {
      ${tw`bg-gray-200`}
   }
`
