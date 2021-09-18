import styled from 'styled-components'
import tw, { css, TwStyle } from 'twin.macro'

import DrawerIcon from '../../../Common/icons/DrawerIcon'

export const Wrapper = styled.div`
   height: calc() ${tw`
        flex flex-grow 
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
   ${tw`flex items-center justify-end mt-28px `}
`
export const IconContainer = styled.div`
   ${tw`mr-16px h-32px w-32px rounded-4px flex items-center justify-center cursor-pointer`}
   ${({ isSelected }): TwStyle => isSelected && tw`bg-transparentPrimary8`}
`

export const listViewContainerCSS = css`
   ${tw`mx-16px mt-25px`}
`

export const ViewContainer = styled.div`
   ${tw`flex flex-col flex-grow `}
`
