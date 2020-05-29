import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo32BrightBlueHKGroteskMedium

} from '../../../common/styleGuide/Typos'
const PageHeading=styled(Typo32BrightBlueHKGroteskMedium)``;

const ObseravationsHeader = styled.div`                                                                                                                                                                
   ${tw`flex items-center justify-between`}
   padding:48px 64px;
   width:100%;
`
const ObseravationsListTable = styled.table`                                                                                                                                                                
   ${tw``}
   
`
export { 
   PageHeading,
   ObseravationsHeader,
   ObseravationsListTable
   }