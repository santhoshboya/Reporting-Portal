import styled from 'styled-components'
import {
   TextFontC2CaptionBasic500,
   TextFontP2ParagraphBasic1000
} from '../../styleGuide/Typos'

const PercentageHint = styled('div')`
   margin-top: 10px;
   display: flex;
`

const ProgressBarWrapper = styled('div')`
   display: flex;
   flex-direction: column;
`

const UploadingText = styled(TextFontC2CaptionBasic500)``

const Percentage = styled(TextFontP2ParagraphBasic1000)`
   padding-left: 5px;
`

export { PercentageHint, UploadingText, Percentage, ProgressBarWrapper }
