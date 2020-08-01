import tw, { styled, css } from 'twin.macro'

import {
   TextFontP1ParagraphBasic500,
   TextFontS1SubtitleBasic1000,
   ButtonFontAASmallBasic500
} from '../../../../Common/styleGuide/Typos'

export const AddTeamWrapper = styled.div`
   ${tw`min-h-screen bg-gray-100 p-6`}
`
export const GoBack = styled.div`
   ${tw`w-full mb-4 flex items-center text-steel cursor-pointer justify-start`}
`
export const BackCaption = styled(TextFontP1ParagraphBasic500)`
   ${tw`text-12px pl-1 text-steel`}
`
export const AddTeamHeadline = styled(TextFontS1SubtitleBasic1000)`
   ${tw`w-full text-32px mt-24px text-darkBlueGrey`}
`
export const TeamDetailsWrapper = styled.div`
   ${tw`w-full flex flex-wrap flex-col justify-center items-center mt-6`}
`
export const TeamDetailsContainer = styled.div`
   ${tw` bg-white border border-solid border-lightBlueGrey w-800 py-32px px-48px h-540px`};
`
export const TeamDetailsHeadingContainer = styled.div`
   ${tw`w-full flex justify-center items-center mb-32px`}
`
export const TeamDetailsHeading = styled(TextFontS1SubtitleBasic1000)`
   ${tw`text-darkBlueGrey`}
`
export const TeamNameContainer = styled.div`
   ${tw`mt-24px`}
`
export const TeamDescritpionContainer = styled(TeamNameContainer)``

export const AddTeamMembersContainer = styled(TeamDescritpionContainer)``

export const SaveButtonContainer = styled.div`
   ${tw`w-800 flex justify-end items-center mt-24px`}
`

export const MembersContainer = styled(AddTeamMembersContainer)`
   ${tw`mt-16px`}
`

export const DescriptionStyles = css`
   ${tw`h-208px`}
`
export const SelectedMembers = styled('div')`
   ${tw`flex overflow-auto items-start  flex-wrap h-32 border border-lightBlueGrey rounded`}
`

export const MemberOption = styled(ButtonFontAASmallBasic500)`
   ${tw`p-2 ml-2 mr-1 mt-2 rounded-lg bg-transparentPrimary8 border border-transparentPrimary32 text-primary500Default font-normal`}
`
