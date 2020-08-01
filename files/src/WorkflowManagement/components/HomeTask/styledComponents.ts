import styled from 'styled-components'

import {
   TextFontLabelBasic600,
   TextFontC2CaptionPimary500Default,
   TextFontP2ParagraphBasic600
} from '../../../Common/styleGuide/Typos'
import colors from '../../../Common/themes/Colors'

const TaskId = styled(TextFontC2CaptionPimary500Default)`
   background-color: rgba(9, 103, 210, 0.08);
   border-radius: 4px;
   color: ${colors.primary500Default};
   padding: 5px 10px;
   font-size: 12px;
`
const TaskOverViewFields = styled.div`
   margin: 15px;
   display: flex;
   flex-direction: column;
`

const FieldDisplayName = styled(TextFontLabelBasic600)`
   font-size: 14px;
   font-weight: bold;
`
const HomeTaskWrapper = styled.div``

const FieldResponse = styled(TextFontP2ParagraphBasic600)`
   font-size: 12px;
`

const FieldResponseImg = styled.img`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   border: 1px solid lightblue;
`

const FieldResponseWrapper = styled.div`
   display: flex;
   flex-direction: column;
`
const TaskIdWrapper = styled.div`
   text-align: right;
   margin: 10px 5px 0px 0px;
`

const TaskWrapper = styled.div`
   border-radius: 5px;
   width: 263px !important;
   height: fit-content;
   background-color: white;
   border: solid 1px ${colors.basic300};
   border-top: 4px solid ${props => props.color};
   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
   &:hover {
      transform: scale(1);
   }
   margin: 8px;
   margin-bottom: 20px;
`

const TaskOverview = styled.div`
   position: relative;
   flex-shrink: 0;
   cursor: pointer;
   background-color: white;
`
const Header = styled.div`
   overflow: hidden;
   cursor: pointer;
   color: ${props => props.color};
   background-color: ${props => props.background};
   height: 24px;

   display: flex;
   justify-content: flex-start;
   align-items: center;
   font-size: 12px;
   padding-left: 10px;
   font-weight: 600;
   z-index: 100;
   transition: all 500ms;
   flex-shrink: 0;
`

const Footer = styled.div`
   overflow: hidden;
   flex-wrap: wrap;
   height: 50px;
   background-color: white;
   z-index: 100;
   transition: all 500ms;
   flex-shrink: 0;
   display: flex;
   align-items: center;
`
const ActionButton = styled.button`
   border-radius: 2px;
   padding: 2px 4px;
   font-size: 10px;
   color: white;
   background-color: ${props => props.color};
   margin-left: 10px;
`
const TaskOverViewWrapper = styled.div`
   position: relative;
`

export {
   TaskOverViewWrapper,
   TaskId,
   TaskOverViewFields,
   FieldDisplayName,
   HomeTaskWrapper,
   FieldResponse,
   FieldResponseImg,
   Footer,
   Header,
   FieldResponseWrapper,
   TaskIdWrapper,
   ActionButton,
   TaskOverview,
   TaskWrapper
}
