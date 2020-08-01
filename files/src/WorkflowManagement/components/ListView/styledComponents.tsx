import tw, { styled, css } from 'twin.macro'

import { TextFontP1ParagraphBasic1000 } from '../../../Common/styleGuide/Typos'

export const ListViewContainer = styled.div`
   ${tw``}
`

export const NoDataViewContainer = styled.div`
   ${tw`flex justify-center items-center h-full w-full`}
`

export const NoDataText = styled(TextFontP1ParagraphBasic1000)``

export const tabCSS = css`
   font-family: HKGrotesk;
   ${tw`font-medium leading-1.71 text-14px mr-32px pb-13px bg-basic200`};
`

export const selectedTabCSS = css`
   font-family: HKGrotesk;
   ${tw`font-medium leading-1.71 text-14px mr-32px pb-12px border-0 border-b-2 border-primary500Default bg-basic200`}
`
