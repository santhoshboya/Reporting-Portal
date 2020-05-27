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
background-color: rgba(215, 223, 233, 0.24);
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
   height: 16px;
   border-radius: 100px;
   border: solid 1px #171f46;
   background-color: white;
`
const PersonDetails = styled.div`
   ${tw` flex flex-row`}
   flex
`
const PersonData = styled.div`
   ${tw`flex flex-col`}
   flex flex-col
`
const TableData = styled(Typo12SteelHKGroteskSemiBold)``
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
   PersonData
}
