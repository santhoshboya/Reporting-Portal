import tw, { styled, TwStyle } from 'twin.macro'

import HomeIcon from '../../icons/HomeIcon'
import HistoryIcon from '../../icons/HistoryIcon'
import SidebarMenuIcon from '../../icons/SidebarMenuIcon'
import DrawerIcon from '../../icons/DrawerIcon'
import CloseIcon from '../../icons/CloseIcon'

export const SlimBarContainer = styled.div`
   ${tw`
        h-full bg-white flex 
   `}
`
export const Container = styled.div`
   ${tw`
        h-full   bg-white flex 
   `}
`
export const SlimBarSubSections = styled.div`
   ${tw`
        my-4 h-full  flex flex-col justify-between
    `};
`
export const SlimBarSection = styled.div`
   ${tw`
       h-full  border-solid border  flex flex-col items-center w-64px
    `};
`
export const HomeIconWrapper = styled(HomeIcon)`
   ${tw`cursor-pointer hover:bg-transparentPrimary8 rounded-sm`}
`
export const HistoryIconWrapper = styled(HistoryIcon)`
   ${tw`cursor-pointer hover:bg-transparentPrimary8`}
`
export const SlimBarMenuWrapper = styled(SidebarMenuIcon)`
   ${tw`cursor-pointer hover:bg-transparentPrimary8`}
`
export const DrawerIconWrapper = styled(DrawerIcon)`
   ${tw`cursor-pointer hover:bg-transparentPrimary8`}
`
export const SlimBarSubSection = styled.div`
   ${tw`my-4 flex flex-col w-12`}
`
export const SlimBarExpandedViewWrapper = styled.div`
   ${(props): TwStyle => (props.isHovered ? tw`w-48` : tw`w-0`)}
   ${tw`
        relative overflow-auto h-full border-gray-200  bg-white transition-all duration-500 ease-in-out border-solid border pt-6
   `};
`
interface IconProps {
   isActive: boolean
}
export const IconWrapper = styled.div<IconProps>`
   ${props => (props.isActive ? tw`shadow bg-transparentPrimary8` : tw``)};
   ${tw`w-12 justify-center items-center flex flex-col cursor-pointer mt-4 hover:bg-transparentPrimary4 h-12`};
`
export const CloseButton = styled(CloseIcon)`
   ${tw``};
`
export const CloseButtonWrapper = styled.div`
   ${tw`absolute p-1 flex justify-center items-center cursor-pointer rounded-full border border-gray-300 border-solid hover:bg-primary500Default`};
   top: 0px;
   right: 0px;
`
