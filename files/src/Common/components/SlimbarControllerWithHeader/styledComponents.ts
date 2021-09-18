import tw, { styled } from 'twin.macro'

export const LayoutAndSideBarContainer = styled.div`
   ${tw`
        flex
    `};
`

export const SideBarContainer = styled.div`
   ${tw`
        h-screen
    `}
`

export const LayoutContainer = styled.div`
   ${tw`
      transition-all duration-500 ease-in-out flex-1 flex mt-70px relative
   `}
`
export const SlimBarHeader = styled.div`
   ${tw`mt-8px`}
`
export const SideBarAndMainSectionContainer = styled.div`
   ${tw`flex border border-red-500 border-solid`}
`
export const Wrapper = styled.div`
   ${tw`flex flex-col h-full`}
`
export const HeaderContainer = styled.div`
   left: 64px;
   position: absolute;
   flex: 1;
   width: calc(100vw - 64px);
   ${tw``};
`
export const SideBarToggleIconContainer = styled.div`
   ${tw`
        absolute rounded-full p-6  cursor-pointer bg-white  shadow-md flex items-center justify-center
    `}
`
