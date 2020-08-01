import tw, { styled, TwStyle } from 'twin.macro'

import Image from '../../../Common/components/Image'
import {
   TextFontC2CaptionPimary500Default,
   TextFontP2ParagraphBasic800
} from '../../../Common/styleGuide/Typos'
import { TextFontC2Caption } from '../../../Common/styleGuide/Typos/styledComponents'
import ButtonWithLoader from '../../../Common/components/ButtonWithLoader'

export const Wrapper = styled.div`
   ${tw`flex items-center justify-start w-20 self-start ml-28px`};
`

export const ActionsWrapper = styled.div`
   ${tw` flex w-full items-center justify-end `};
   position: relative;
   right: 5.4%;
`

export const TaskRow = styled.div`
   ${tw` w-full flex justify-around flex-row items-center `};
`

export const TaskWrapper = styled.div`
   ${tw`border-0 border-b-default border-solid border-basic300 py-16px flex flex-col justify-between`};
   ${props =>
      props.isHovered
         ? ` box-shadow: 0 4px 40px 0 rgba(0, 33, 89, 0.16); z-index:2`
         : ''};
   ${({ isHovered }): TwStyle => (isHovered ? tw`h-162px` : tw`h-56px`)}
   transition:height .15s ease-in-out;
`

export const TaskIdContainer = styled.div`
   ${tw`w-78px h-24px bg-transparentPrimary8 rounded-4px px-16px py-4px box-border flex items-center`};
`

export const TaskId = styled(TextFontC2CaptionPimary500Default)`
   ${tw`leading-1.33 overflow-hidden`};
   ${props =>
      props.isHovered
         ? {}
         : {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
           }}
`

export const FieldValue = styled(TextFontP2ParagraphBasic800)`
   ${tw`leading-1.71 `};
   ${({ isHovered }): TwStyle =>
      isHovered ? tw`whitespace-pre-wrap` : tw`truncate`}
`

export const StyledImage = styled(Image)`
   ${tw`w-32px h-32px rounded-full`}
`
export const StyledTableData = styled.div`
   ${tw`align-middle  overflow-hidden text-left px-32px  box-border `};
   flex-basis: 0px;
   flex-grow: 1;
   ${props =>
      props.isHovered
         ? {}
         : {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
           }}
`

export const ActionButton = styled(ButtonWithLoader)`
   ${tw`mr-16px flex items-center justify-center focus:outline-none text-white`};
   border-radius: 4px;
   background-color: ${props => props.color};
`

export const ActionName = styled(TextFontC2Caption)``

export const IconWrapper = styled.div`
   ${tw`cursor-pointer w-20px h-20px mr-16px flex items-center justify-center`}
`
export const LoaderWrapper = styled.div``
