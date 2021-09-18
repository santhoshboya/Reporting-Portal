import styled from 'styled-components'

import colors from '../../../Common/themes/Colors'
import { TextFontH2HeadlineBasic1000 } from '../../../Common/styleGuide/Typos'

const Wrapper = styled.div`
   background-color: ${colors.basic200};
   padding-top: 20px;
   width: 100%;
`
const ProjectHomeWrapper = styled.div`
   border: 1px solid ${colors.basic300};
`

const Title = styled(TextFontH2HeadlineBasic1000)`
   font-family: HKGrotesk;
   font-size: 36px;
   font-weight: bold;
   font-stretch: normal;
   font-style: normal;
   display: flex;
   align-items: baseline;
   line-height: 0.83;
   color: ${colors.basic1000};
   margin: 15px;
   margin-bottom: 20px;
`

export { Wrapper, ProjectHomeWrapper, Title }
