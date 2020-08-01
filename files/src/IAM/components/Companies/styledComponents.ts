import tw, { styled } from 'twin.macro'

import {
   TextFontS1SubtitleBasic1000,
   TextFontC1CaptionBasic1000
} from '../../../Common/styleGuide/Typos'

export const CompaniesWrapper = styled.div`
   ${tw`w-full min-h-screen bg-gray100  py-40px pl-40px pr-32px `}
`
export const Headline = styled(TextFontS1SubtitleBasic1000)`
   ${tw`w-full text-32px text-darkBlueGrey font-normal`}
`
export const CompaniesListContainer = styled.div`
   ${tw`w-full mt-32px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6 `}
`

export const NoCompaniesView = styled.div`
   ${tw`w-full h-290px  flex  justify-center items-center`}
`

export const NoCompaniesCaption = styled(TextFontC1CaptionBasic1000)`
   ${tw`text-24px`}
`
