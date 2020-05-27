import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Typo14SteelHKGroteskRegular,Typo12DarkBlueGreyRubikMedium } 
from '../../../common/styleGuide/Typos'

const BackToObservationsLink=styled(Typo14SteelHKGroteskRegular)`${tw`flex`}
   margin-bottom:34px;`;
const FieldName=styled(Typo12DarkBlueGreyRubikMedium)`
   width:25%;
   margin-left:30px;
   `
   ;
const ObservationForm = styled.div`                                                                                                                                                                
   ${tw``}
   width:80%;
   background-color:white;
   padding:42px 80px;
   margin-top:32px;
   
`
const FieldContainer = styled.div`                                                                                                                                                                
   ${tw`flex items-center `}
   margin-bottom:48px;
   width:100%;
`

export { 
   BackToObservationsLink,
   ObservationForm,
   FieldContainer,
   FieldName
   }
