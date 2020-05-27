import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {Typo18DarkBlueGreyHKGroteskMedium,
   Typo24DarkBlueGreyHKGroteskMedium, 
   Typo18BrightBlueHKGroteskBold,
   Typo18steelHKGroteskRegular} from '../../styleGuide/Typos'
const PageHeaderDiv = styled.div`
   ${tw`flex w-screen justify-between`}
   height: 80px;
   border: solid 1px #d7dfe9;
   background-color: #ffffff;
`
const Title=styled(Typo24DarkBlueGreyHKGroteskMedium)`padding-left:24px`;
const UserName=styled(Typo18DarkBlueGreyHKGroteskMedium)`padding-right:24px`;
const RpFeatureOne=styled(Typo18BrightBlueHKGroteskBold)`padding-right:12px`
const RpFeatureTwo=styled(Typo18steelHKGroteskRegular)`padding-right:24px`
const LeftPart = styled.div`
   ${tw`flex items-center`}
   padding-left:32px;
`
const RightPart = styled.div`                                                                                                                                                                
   ${tw`flex items-center`}
   padding-right:32px;
`
const RightSubPartOne = styled.div`                                                                                                                                                                
   ${tw`flex items-center`}
   padding-right:10px;
`
const RightSubPartTwo = styled.div`                                                                                                                                                                
   ${tw`flex items-center`}
   padding-right:10px;
`
export { 
   PageHeaderDiv,
   LeftPart,
   RightPart,
   Title,
   UserName,
   RpFeatureOne,
   RpFeatureTwo,
   RightSubPartOne,
   RightSubPartTwo}
