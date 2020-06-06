import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo32BrightBlueHKGroteskMedium

} from '../../../common/styleGuide/Typos'
const PageHeading = styled(Typo32BrightBlueHKGroteskMedium)``;

const ObseravationsHeader = styled.div`                                                                                                                                                                
   ${tw`flex flex-col`}
   padding:48px 48px;
   width:98%;
`
const PageHeadingAndAddButonDiv = styled.div`${tw`flex items-center justify-between`}`
const ObseravationsListTable = styled.table`                                                                                                                                                                
   ${tw``}
`
const ParentDiv = styled.div``
const FilterBar = styled.div`${tw` flex justify-between`}`
const TableHeader = styled.thead``
const TableBody = styled.tbody``
const FilterLefttSubPart = styled.div`${tw`flex`}`
export {
   PageHeading,
   ObseravationsHeader,
   ObseravationsListTable,
   TableHeader,
   TableBody,
   PageHeadingAndAddButonDiv,
   FilterBar,
   FilterLefttSubPart,
   ParentDiv
}
