import styled from 'styled-components'
import tw, { css, TwStyle } from 'twin.macro'

import DrawerIcon from '../../../Common/icons/DrawerIcon'

export const Wrapper = styled.div`
   ${tw`
        w-screen h-screen flex 
    `};
`

export const boardListCss = css`
   display: flex;
   flex-direction: column;
`

export const boardCss = css`
   color: white;
   padding: 10px;
`
export const DrawerIconWrapper = styled(DrawerIcon)`
   ${tw`cursor-pointer hover:bg-transparentPrimary8 mt-4`}
`

export const IconsContainer = styled.div`
   ${tw`flex items-center justify-end mt-24px `}
`
export const IconContainer = styled.div`
   ${tw`mr-16px h-32px w-32px rounded-4px flex items-center justify-center`}
   ${({ isSelected }): TwStyle => isSelected && tw`bg-transparentPrimary8`}
`

export const listViewContainerCSS = css`
   ${tw`mx-16px mt-36px`}
`

export const ViewContainer = styled.div`
   ${tw`flex flex-col`}
`
