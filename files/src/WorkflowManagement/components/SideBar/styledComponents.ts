import tw, { styled, TwStyle } from 'twin.macro'
import colors from '../../../Common/themes/Colors'
interface SideBarContainerProps {
   isCollapsed: boolean
}

export const SideBarContainer = styled.div`
   ${(props: SideBarContainerProps): TwStyle =>
      props.isCollapsed ? tw`w-16` : tw`w-64`}
   ${tw`
        h-full flex flex-col items-stretch justify-between fixed bg-darkBlueGrey transition-all duration-300 ease-in-out
   `}
`

export const SideBarSection = styled.div`
   ${tw`
        my-4
    `}
`

export const SideBarToggleIconContainer = styled.div`
   ${tw`
        absolute rounded-full p-2 top-10px cursor-pointer bg-white hover:bg-lightBlueGrey shadow-md flex items-center justify-center
    `}

   right: -10px;
   fill: ${colors.basic700};

   &:hover {
      ${tw`bg-primary500Default`}

      * {
         fill: ${colors.white};
      }
   }
`
