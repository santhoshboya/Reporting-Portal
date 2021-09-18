import styled from 'styled-components'
import tw from 'twin.macro'

export const BaseHKGroteskText = styled.span`
   font-family: HKGrotesk;
`
export const BaseHKGroteskMediumText = styled(BaseHKGroteskText)`
   font-weight: 500;
`

export const BaseHKGroteskSemiBoldText = styled(BaseHKGroteskText)`
   font-weight: 600;
`
export const BaseHKGroteskBoldText = styled(BaseHKGroteskText)`
   font-weight: bold;
`

export const TextFontT1Title = styled(BaseHKGroteskBoldText)`
   ${tw`text-72px`}
`

export const TextFontT2Title = styled(BaseHKGroteskBoldText)`
   ${tw`text-60px`}
`

export const TextFontH1Headline = styled(BaseHKGroteskBoldText)`
   ${tw`text-48px`}
`

export const TextFontH2Headline = styled(BaseHKGroteskBoldText)`
   ${tw`text-36px`}
`

export const TextFontH3Headline = styled(BaseHKGroteskBoldText)`
   ${tw`text-30px`}
`
export const TextFontH4Headline = styled(BaseHKGroteskBoldText)`
   ${tw`text-24px`}
`

export const TextFontH5Headline = styled(BaseHKGroteskBoldText)`
   ${tw`text-20px`}
`

export const TextFontH6Headline = styled(BaseHKGroteskMediumText)`
   ${tw`text-18px`}
`
export const TextFontS1Subtitle = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-16px`}
`

export const TextFontS2Subtitle = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px`}
`
export const TextFontLabel = styled(BaseHKGroteskBoldText)`
   ${tw`text-12px`}
`
export const TextFontC2Caption = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px`}
`
export const TextFontC1Caption = styled(BaseHKGroteskMediumText)`
   ${tw`text-12px`}
`
export const ButtonFontAASmall = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px`}
`
export const TextFontP1Paragraph = styled(BaseHKGroteskText)`
   ${tw`text-16px`}
`
export const ButtonFontAAMedium = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px`}
`

export const TextFontP2Paragraph = styled(BaseHKGroteskMediumText)`
   ${tw`text-14px`}
`

export const ButtonFontAALarge = styled(BaseHKGroteskBoldText)`
   ${tw`text-16px`}
`
export const ButtonFontAATiny = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-10px`}
`
export const ButtonFontAAGiant = styled(BaseHKGroteskBoldText)`
   ${tw`text-18px`}
`
export const TextFontL2Label = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px`}
`
