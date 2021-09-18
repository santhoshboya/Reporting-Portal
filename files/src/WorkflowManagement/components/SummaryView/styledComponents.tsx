import tw, { styled, TwStyle } from 'twin.macro'

import {
   TextFontLabelBasic600,
   TextFontC1CaptionBasic800,
   TextFontS1SubtitleBasic800
} from '../../../Common/styleGuide/Typos'

interface DetailContainerProps {
   isKanbanView: boolean
}
interface SummaryViewContainerProps {
   isKanbanView: boolean
}

export const SummaryContainer = styled.div`
   ${tw`px-24px py-16px rounded-4px bg-transparentPrimary8 flex flex-col mt-16px`}
`

export const SummaryViewContainer = styled.div`
   ${tw`flex cursor-pointer items-center`};
   ${(props: SummaryViewContainerProps) =>
      props.isKanbanView ? tw`justify-between` : tw``}
`
export const SummaryText = styled(TextFontLabelBasic600)`
   ${tw`mr-16px leading-1.33 tracking-0.4px uppercase`}
`

export const IconContainer = styled.div`
   ${({ isOpen }): TwStyle => isOpen && tw`transform rotate-180`};
`

export const DetailsContainer = styled.div`
   ${tw`mt-14px`};
   ${(props: DetailContainerProps) =>
      props.isKanbanView ? tw`` : tw`flex flex-row`}
`
export const DetailContainer = styled.div`
   ${tw`flex `}
   ${(props: DetailContainerProps) =>
      props.isKanbanView
         ? tw`flex-grow flex-row justify-between`
         : tw`flex-col items-start mr-48px`}
`

export const DetailLabel = styled(TextFontC1CaptionBasic800)`
   ${tw`leading-1.33 tracking-0.4px`}
`

export const DetailValue = styled(TextFontS1SubtitleBasic800)`
   ${tw`leading-normal mt-4px`}
`
