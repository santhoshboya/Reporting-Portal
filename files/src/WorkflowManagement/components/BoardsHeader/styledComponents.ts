import tw, { styled, css } from 'twin.macro'

import {
   ButtonFontAAMediumTextColorDefault,
   TextFontS1SubtitleBasic700
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'
import Colors from '../../../Common/themes/Colors'
import DropDown from '../../../Common/components/DropDown'
import ArrowDownIcon from '../../../Common/icons/ArrowDownIcon'
import FinManIcon from '../../../Common/icons/FinManIcon'

export const BoardsHeaderContainer = styled.div`
   ${tw`flex justify-between border  items-center`}
   height:71px;
`

export const HeaderLeftPanel = styled.div`
   ${tw`flex items-center pl-4 `}
`

export const HeaderRightPanel = styled.div`
   ${tw`flex items-center pl-4  pr-4`}
`

export const ButtonText = styled(ButtonFontAAMediumTextColorDefault)`
   ${tw`text-white pl-2 `}
`

export const ButtonWrapper = styled(Button)`
   ${tw`ml-4 border-none border-0 flex items-center`}
`

export const ProjectLogo = styled(FinManIcon)`
   ${tw` ml-3`}
`

export const ProjectTreeContainer = styled.div`
   ${tw`flex items-center`}
`

export const ProjectNameContainer = styled.div`
   ${tw`pl-4 flex items-center`}
`

export const ProjectName = styled(TextFontS1SubtitleBasic700)`
   ${tw``}
`

export const ArrowLeftIconWrapper = styled(ArrowDownIcon)`
   ${tw`pt-2`}
   width:35px;
   height: 35px;
   transform: rotate(-90deg);
`

export const BoardsDropDown = styled(DropDown)`
   ${tw``}
`

export const dropDownCSS = css`
   border: none;
   :focus {
      border: none;
   }
   .Select__single-value {
      font-family: HKGrotesk;
      color: ${Colors.basic1000};
      font-size: 14px;
      font-weight: 600;
   }
   .Select__value-container {
      width: 100px;
   }
   .Select__menu-list {
      max-height: 25vh;
   }
`

export const containerCss = css`
   width: 235px;
   display: flex;
   align-items: center;
`

export const customStyles = {
   control: (base, state) => ({
      ...base,
      border: '0 !important',
      boxShadow: '0 !important',
      '&:hover': {
         border: '0 !important'
      }
   })
}
