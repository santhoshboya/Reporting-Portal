import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo14SteelHKGroteskRegular, Typo12SteelHKGroteskSemiBold, Typo12DarkBlueGreyRubikMedium, Typo24DarkBlueGreyHKGroteskMedium }
   from '../../../common/styleGuide/Typos'

const BackToObservationsLink = styled(Typo14SteelHKGroteskRegular)`${tw`flex`}
   margin-bottom:34px;`;
const FieldName = styled(Typo12DarkBlueGreyRubikMedium)`
   width:25%;
   margin-left:30px;
   `;
const ObsertationDiv = styled(Typo12DarkBlueGreyRubikMedium)`${tw`flex justify-center`}
border-bottom:2px solid blue;
width:100px;
`

const ChatHeading = styled(Typo12SteelHKGroteskSemiBold)`
margin-left:20px;
padding-top:4px;
`
const Title = styled(Typo24DarkBlueGreyHKGroteskMedium)`
padding-left:20px`
const ObservationForm = styled.div`                                                                                                                                                                
   ${tw`flex flex-col`}
   width:80%;
   background-color:white;
   padding:42px 80px;
   margin:32px 0px;
`
const DragAndDrop = styled.div`${tw``}
   width:25%;
   height:80px;
   border-radius: 2px;
  border: solid 1px #d7dfe9;
  background-color: #ffffff;
`
const FieldContainer = styled.div`                                                                                                                                                                
   ${tw`flex items-center `}
   margin-bottom:48px;
   width:100%;
`
const Buttons = styled.div``
const Required = styled.span`
color:#ff0b37;
font-size: 12px;`
const ButtonsDiv = styled.div`${tw`flex justify-center items-center`}`
const RadioButtonsDiv = styled.div`${tw`flex`}
margin-left:260px;
margin-bottom:48px
`
const HeaderDiv = styled.div`${tw`flex `}
margin-top:20px;
width:1050px;
border-bottom: 1px solid lightgrey;

`
const RadioLable = styled.label`
margin-right:20px;`
export {
   BackToObservationsLink,
   ObservationForm,
   FieldContainer,
   FieldName,
   DragAndDrop,
   Required,
   Title,
   ButtonsDiv,
   RadioButtonsDiv,
   RadioLable,
   HeaderDiv,
   ChatHeading,
   Buttons,
   ObsertationDiv
}
