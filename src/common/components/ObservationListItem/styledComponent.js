import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo12SteelHKGroteskSemiBold,
   Typo8DarkBlueGreyHKGroteskSemiBold,
   Typo12WhiteHKGroteskBold
} from '../../styleGuide/Typos'

const TableRow = styled.tr`${tw`flex justify-around items-center`}
width: 1240px;
height: 66px;
border: solid 1px  #d7dfe9;

}`
const RectangleSeverity = styled.div`
   ${tw` flex justify-center items-center`}
   width: 72px;
   height: 21px;
   border-radius: 100px;
   background-color: ${props => props.bgColor};
`

const RectangleActionStatus = styled.div`
   ${tw``}
   height: 20px;
   padding: 3px 10px;
   border-radius: 100px;
   border: solid 1px #171f46;
   background-color: white;
`
const PersonDetails = styled.div`
   ${tw`flex justify-center`}
   width:100%;
`
const PersonData = styled.div`
   ${tw`flex flex-col `}
   margin-left:10px;
`
const TableData = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`flex justify-center items-center`}
   width:14%;
   height: 64px;
   overflow: auto;
`

const MsgCount = styled.span`
   ${tw`flex justify-center items-center`}
   background-color:#ff0b37;
   width: 11px;
   height: 11px;
   color: white;
   border-radius: 50%;
   position: relative;
   top: -10px;
   left: -5px;
`
const SevertyStatus = styled(Typo12WhiteHKGroteskBold)``
const ObservationStatus = styled(Typo8DarkBlueGreyHKGroteskSemiBold)``
export {
   TableRow,
   TableData,
   RectangleSeverity,
   RectangleActionStatus,
   SevertyStatus,
   ObservationStatus,
   PersonDetails,
   PersonData,
   MsgCount
}
