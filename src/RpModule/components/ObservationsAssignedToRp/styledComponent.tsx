import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo32BrightBlueHKGroteskMedium } from '../../../common/styleGuide/Typos'
const PageHeading = styled(Typo32BrightBlueHKGroteskMedium)``

const ObseravationsHeader = styled.div`
   ${tw`flex flex-col`}
   padding:48px 64px;
   width: 100%;
`
const ObseravationsListTable = styled.table`
   ${tw``}
`
const TableHeader = styled.thead``
const TableBody = styled.tbody``
export {
   PageHeading,
   ObseravationsHeader,
   ObseravationsListTable,
   TableHeader,
   TableBody
}
