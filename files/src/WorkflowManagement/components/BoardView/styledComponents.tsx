import tw, { styled, TwStyle } from 'twin.macro'

import { TextFontP2ParagraphBasic600 } from '../../../Common/styleGuide/Typos'

export const BoardWrapper = styled('div')`
   ${(props): TwStyle =>
      props.isSelected ? tw`bg-transparentPrimary8` : tw`bg-white`}
   ${tw`flex p-4 cursor-pointer hover:bg-transparentPrimary4`}
`
export const BoardTitle = styled(TextFontP2ParagraphBasic600)`
   ${tw`whitespace-no-wrap overflow-hidden`}
   ${(props): TwStyle =>
      props.isSelected
         ? tw`text-primary500Default `
         : tw``}
   text-overflow: ellipsis;
`
