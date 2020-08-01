import tw, { styled } from 'twin.macro'

import {
   TextFontP1ParagraphBasic1000,
   TextFontP2ParagraphBasic200,
   TextFontS2SubtitleBasic1000
} from '../../../../Common/styleGuide/Typos'

export const CompanyContainer = styled.div`
   ${tw` p-24px h-290px rounded-md bg-white flex flex-col border border-solid  border-lightBlueGrey`}
`
export const CompanyCardHeader = styled.div`
   ${tw`flex justify-between w-full flex-wrap`}
`

export const CompanyTitleWrapper = styled.div`
   ${tw` w-9/12  flex items-center `}
`

export const AvatarContainer = styled.div`
   ${tw`mr-8px`}
`

export const CompanyTitle = styled(TextFontP1ParagraphBasic1000)`
   ${tw`ml-16px font-bold w-full`}
`
export const IconContainer = styled.div`
   ${tw`pt-3 pr-4`}
`

export const AlertMessageTypo = styled(TextFontP1ParagraphBasic1000)`
   ${tw`ml-0 font-semibold`}
`
export const CompanyDescription = styled(TextFontP2ParagraphBasic200)`
   ${tw`mt-20px h-24 overflow-hidden text-steel`}
`
export const EmployeesCount = styled(TextFontS2SubtitleBasic1000)`
   ${tw`mb-12px`}
`

export const ListMenuContainer = styled.div`
   ${tw`bg-white w-228px p-8px shadow border rounded-4px flex flex-col`}
`

export const ListMenuItem = styled(TextFontS2SubtitleBasic1000)`
   ${tw`px-16px py-8px cursor-pointer`}

   &:hover {
      ${tw`text-darkBlueGrey bg-lightBlueGrey24`}
   }
`
