import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo14SteelHKGroteskRegular,
   Typo12DarkBlueGreyRubikMedium
} from '../../../common/styleGuide/Typos'

const BackToObservationsLink = styled(Typo14SteelHKGroteskRegular)`
   ${tw`flex`}
   margin-bottom:34px;
   width: 150px;
   cursor: pointer;
`
const FieldName = styled(Typo12DarkBlueGreyRubikMedium)`
   width: 25%;
   margin-left: 30px;
`

const ObservationForm = styled.div`
   ${tw`flex flex-col`}
   width:80%;
   background-color: white;
   padding: 42px 80px;
   margin: 32px 0px;
`
const DragAndDrop = styled.div`
   ${tw` flex justify-center items-center`}
   width:34%;
   height: 80px;
   border-radius: 2px;
   border: solid 1px #d7dfe9;
   background-color: #ffffff;
`
const FieldContainer = styled.div`
   ${tw`flex items-center `}
   margin-bottom:48px;
   width: 100%;
`
const Required = styled.span`
   color: #ff0b37;
   font-size: 12px;
`

const InputAndErrorField = styled.div`
   ${tw`flex flex-col`}
   width:100%
`
export {
   BackToObservationsLink,
   ObservationForm,
   FieldContainer,
   FieldName,
   DragAndDrop,
   Required,
   InputAndErrorField
}
