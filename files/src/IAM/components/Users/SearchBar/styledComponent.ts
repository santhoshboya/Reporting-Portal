import tw, { styled } from 'twin.macro'

import { TextFontS2SubtitleBasic1000 } from '../../../../Common/styleGuide/Typos'

export const SearchBarContainer = styled.div`
   ${tw`flex items-center bg-white h-10 px-4  border border-solid border-gray-500 rounded w-full`};
`

export const SearchiconDiv = styled.div`
   ${tw`flex items-center w-6 h-6`};
`

export const SearchImage = styled.img`
   ${tw`w-1/2 `};
`

export const InputField = styled(TextFontS2SubtitleBasic1000)`
   ${tw`w-full h-6 bg-white outline-none border border-none`};
`
