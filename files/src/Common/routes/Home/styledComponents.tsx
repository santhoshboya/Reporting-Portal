import styled, { css } from 'styled-components'

import tw from 'twin.macro'

export const TailwindContainer = styled.div`
   ${tw`flex flex-col items-center justify-center`}
`

export const tailwindContainerCSS = css`
   background: linear-gradient(to right, #db00ff, #0047ff);
   ${tw`h-40`}
`

export const MainSection = styled.div`
   ${tw`
      flex flex-1
   `}
`

export const MainSectionContentContainer = styled.pre`
   ${tw`
      m-0 p-0
   `}
`
export const Header = styled.div`
   ${tw`border border-red-500 border-solid`}
`

export const IAMRoutesButtonsContainer = styled.div`
   ${tw`flex flex-col items-center`}
   &> button {
      margin: 10px 0px;
   }
`
export const ChildrenDiv = styled.div`
   ${tw`overflow-y-scroll`}
`
