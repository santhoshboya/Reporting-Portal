import tw, { styled } from 'twin.macro'
import {
   TextFontH2HeadlineBasic200,
   TextFontP2ParagraphBasic1000
} from '../../styleGuide/Typos'

export const HeaderContainer = styled.div`
   ${tw`flex p-4 shadow`}
`
export const LeftPaneWrapper = styled.div`
   ${tw`flex-1`}
`
export const RightPaneWrapper = styled.div`
   ${tw`flex justify-around items-center`}
   &> * {
      margin: 0px 10px;
      flex-shrink: 0;
   }
`

export const WelcomeText = styled(TextFontH2HeadlineBasic200)`
   /* FIXME:  import TextFontH2HeadlineBasic1000 and apply*/
   ${tw`text-black`}
`
export const Text = styled(TextFontP2ParagraphBasic1000)``
