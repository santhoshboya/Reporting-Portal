import React from 'react'
import { storiesOf } from '@storybook/react'

import styled from 'styled-components'
import tw from 'twin.macro'

import {
   TextFontS1Subtitle,
   TextFontLabel,
   TextFontC2Caption,
   TextFontP1Paragraph,
   ButtonFontAASmall,
   TextFontT1Title,
   TextFontT2Title,
   TextFontH1Headline,
   TextFontH3Headline,
   TextFontH4Headline,
   TextFontH5Headline,
   TextFontH6Headline,
   TextFontS2Subtitle,
   ButtonFontAAGiant,
   ButtonFontAALarge,
   ButtonFontAAMedium,
   TextFontC1Caption,
   TextFontL2Label,
   ButtonFontAATiny,
   TextFontP2Paragraph
} from './styledComponents'

export const TyposWrapper = styled.div`
   ${tw`flex flex-wrap 	items-center`}
`

export const TextFontS1SubtitleTypo = styled(TextFontS1Subtitle)`
   ${tw`m-2`}
`
export const TextFontS2SubtitleTypo = styled(TextFontS2Subtitle)`
   ${tw`m-2`}
`

export const TextFontLabelTypo = styled(TextFontLabel)`
   ${tw`m-2`}
`
export const TextFontL2LabelTypo = styled(TextFontL2Label)`
   ${tw`m-2`}
`
export const TextFontC1CaptionTypo = styled(TextFontC1Caption)`
   ${tw`m-2`}
`
export const TextFontC2CaptionTypo = styled(TextFontC2Caption)`
   ${tw`m-2`}
`

export const TextFontP1ParagraphTypo = styled(TextFontP1Paragraph)`
   ${tw`m-2`}
`
export const TextFontP2ParagraphTypo = styled(TextFontP2Paragraph)`
   ${tw`m-2`}
`

export const ButtonFontAASmallTypo = styled(ButtonFontAASmall)`
   ${tw`m-2 bg-blue-500 p-3`}
`
export const ButtonFontAATinyTypo = styled(ButtonFontAATiny)`
   ${tw`m-2 bg-blue-500 p-3`}
`
export const ButtonFontAAGiantTypo = styled(ButtonFontAAGiant)`
   ${tw`m-2 bg-blue-500 p-3`}
`
export const ButtonFontAALargeTypo = styled(ButtonFontAALarge)`
   ${tw`m-2 bg-blue-500 p-3`}
`
export const ButtonFontAAMediumTypo = styled(ButtonFontAAMedium)`
   ${tw`m-2 bg-blue-500 p-3`}
`
export const TextFontT1TitleTypo = styled(TextFontT1Title)`
   ${tw`m-2`}
`

export const TextFontT2TitleTypo = styled(TextFontT2Title)`
   ${tw`m-2`}
`

export const TextFontH1HeadlineTypo = styled(TextFontH1Headline)`
   ${tw`m-2`}
`

export const TextFontH3HeadlineTypo = styled(TextFontH3Headline)`
   ${tw`m-2`}
`

export const TextFontH4HeadlineTypo = styled(TextFontH4Headline)`
   ${tw`m-2 `}
`
export const TextFontH5HeadlineTypo = styled(TextFontH5Headline)`
   ${tw`m-2`}
`

export const TextFontH6HeadlineTypo = styled(TextFontH6Headline)`
   ${tw`m-2`}
`
const Typos = () => (
   <TyposWrapper>
      <TextFontT1TitleTypo>TextFontT1Title</TextFontT1TitleTypo>
      <TextFontT2TitleTypo>TextFontT2Title</TextFontT2TitleTypo>
      <TextFontH1HeadlineTypo>TextFontH1Headline</TextFontH1HeadlineTypo>
      <TextFontH3HeadlineTypo>TextFontH3Headline</TextFontH3HeadlineTypo>
      <TextFontH4HeadlineTypo>TextFontH4Headline</TextFontH4HeadlineTypo>
      <TextFontH5HeadlineTypo>TextFontH5Headline</TextFontH5HeadlineTypo>
      <TextFontH6HeadlineTypo>TextFontH6Headline</TextFontH6HeadlineTypo>
      <TextFontS1SubtitleTypo>TextFontS1Subtitle</TextFontS1SubtitleTypo>
      <TextFontS2SubtitleTypo>TextFontS2Subtitle</TextFontS2SubtitleTypo>
      <TextFontLabelTypo>TextFontLabel</TextFontLabelTypo>
      <TextFontC1CaptionTypo>TextFontC1Caption</TextFontC1CaptionTypo>
      <TextFontC2CaptionTypo>TextFontC2Caption</TextFontC2CaptionTypo>
      <TextFontP1ParagraphTypo>TextFontP1Paragraph</TextFontP1ParagraphTypo>
      <TextFontP2ParagraphTypo>TextFontP2Paragraph</TextFontP2ParagraphTypo>
      <ButtonFontAATinyTypo>ButtonFontAATiny</ButtonFontAATinyTypo>
      <ButtonFontAASmallTypo>ButtonFontAASmall</ButtonFontAASmallTypo>
      <ButtonFontAAMediumTypo>ButtonFontAAMedium</ButtonFontAAMediumTypo>
      <ButtonFontAALargeTypo>ButtonFontAALarge</ButtonFontAALargeTypo>
      <ButtonFontAAGiantTypo>ButtonFontAAGiant</ButtonFontAAGiantTypo>
   </TyposWrapper>
)

storiesOf('Typos', module).add('Sample typos', () => <Typos />)
