import styled from '@emotion/styled'
import { TextFontS1Subtitle } from '../../../Common/styleGuide/Typos/styledComponents'

export const TaskWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   padding: 20px;
   background-color: #f2f2f2;
`

export const GOFWrappper = styled.div<{ gofsLength: any }>`
   margin: 20px;
   background-color: #ffffff;
   padding: 20px;
`

export const GOFName = styled.span`
   margin: 10px;
`

export const ActionWrapper = styled.div`
   display: flex;
   justify-content: flex-end;
   width: 800px;
`

export const AddAnother = styled(TextFontS1Subtitle)`
   color: #0b69ff;
   cursor: pointer;
`
