import styled from 'styled-components'
import tw from 'twin.macro'
import {
   TextFontP2ParagraphBasic800,
   TextFontLabelBasic600
} from '../../../Common/styleGuide/Typos'

export const Text = styled(TextFontP2ParagraphBasic800)`
   ${tw`my-2 block m-8px`};
`

export const Title = styled(TextFontLabelBasic600)`
   ${tw`text-sm my-2 block m-8px`};
`
export const Image = styled.img`
   width: 35px;
`
