import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../styleGuide/Typos'

const TableRow = styled.tr`${tw`flex justify-around items-center`}
width: 1240px;
height: 66px;
border: solid 1px  #d7dfe9;
background-color: #ffffff;
}`
const PersonTypeDiv = styled.span`${tw`flex justify-around items-center`}`
const TableHeading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
`
export {
   TableRow,
   TableHeading,
   PersonTypeDiv
}
