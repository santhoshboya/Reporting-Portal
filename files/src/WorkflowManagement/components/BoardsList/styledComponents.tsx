import styled from 'styled-components'
import tw from 'twin.macro'

import {
   Typo16SemiBoldBlackHKGrotesk,
   TextFontL2LabelBasic600
} from '../../../Common/styleGuide/Typos'
import InfiniteScrollComponent from '../../../Common/components/InfiniteScrollList'

export const CardContainer = styled('div')`
   ${tw`rounded`}
`

export const LoaderWrapper = styled('div')`
   ${tw`flex justify-center`}
`
export const InfiniteScrollComponentWrapper = styled(InfiniteScrollComponent)`
   ${tw`p-2 bg-white`}
   overflow-y: scroll;
   ::-webkit-scrollbar {
      display: none;
   }
   scrollbar-width: none;
   -ms-overflow-style: none;
`
export const BoardsListHeaderComponent = styled('div')`
   ${tw`flex p-3 items-center `}
`
export const BoardsTitle = styled(Typo16SemiBoldBlackHKGrotesk)`
   ${tw`flex px-1 text-white`}
`
export const BoardsListWrapper = styled('div')`
   ${tw`py-4 `}
   min-width:180px;
`
export const BoardsHeading = styled(TextFontL2LabelBasic600)`
   ${tw`px-6 py-4`}
`
