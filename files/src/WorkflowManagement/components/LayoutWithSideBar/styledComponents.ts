import tw, { styled, TwStyle } from 'twin.macro'
import HomeIcon from '../../../Common/icons/HomeIcon'
import HistoryIcon from '../../../Common/icons/HistoryIcon'
import SidebarMenuIcon from '../../../Common/icons/SidebarMenuIcon'
import DrawerIcon from '../../../Common/icons/DrawerIcon'
import Image from '../../../Common/components/Image'

export const LayoutAndSideBarContainer = styled.div`
   ${tw`flex flex-col`}
`
export const SideBarContainer = styled.div`
   ${tw`h-screen`}
`
export const LayoutContainer = styled.div`
   ${tw`overflow-auto transition-all duration-500 ease-in-out`}
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
   ${tw`cursor-pointer hover:bg-transparentPrimary8 mt-4`}
`
export const SlimBarHeaderWrapper = styled.div`
   ${tw`flex flex-col  items-center`}
`
export const SlimBarFooterWrapper = styled.div``

export const HeaderContainer = styled.div``

export const SlimBarWithLayoutContainer = styled.div`
   ${tw`flex `}
`
export const Logo = styled(Image)`
   ${tw`w-10 h-10 mt-2`}
`
