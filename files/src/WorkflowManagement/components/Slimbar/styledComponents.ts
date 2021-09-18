import tw, { styled, TwStyle } from 'twin.macro'

export const SlimBarContainer = styled.div`
   ${tw`
        h-screen   bg-white flex 
   `}
`

export const SlimBarSection = styled.div`
   ${tw`
        my-4 h-full border-solid border ml-2  flex flex-col justify-between
    `}
`

export const SideBarViewWrapper = styled.div`
   ${(props): TwStyle => (props.isSlimBarItemSelected ? tw`w-48` : tw`w-0`)}
   ${tw`
       overflow-auto h-full border-gray-200  bg-white transition-all duration-500 ease-in-out border-solid border my-4
   `}
`
