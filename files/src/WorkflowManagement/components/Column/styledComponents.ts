import styled from 'styled-components'
import tw from 'twin.macro'

import '../../../index.css'

import { ButtonFontAAMediumBasic600 } from '../../../Common/styleGuide/Typos'

interface WrapperProps {
   shouldHighlight: boolean
}

export const Wrapper = styled.div`
   min-width: 250px;
   max-height: calc(100vh - 170px);
   flex-basis: 0;
   ${tw`
        p-1 m-2 mt-0 pt-16px flex-grow bg-transparentPrimary4 box-border rounded box-border overflow-y-scroll`};
   ${(props: WrapperProps) =>
      props.shouldHighlight ? `box-shadow:0px 0px 20px gray` : ``};

   ::-webkit-scrollbar {
      display: none;
   }
   scrollbar-width: none;
   -ms-overflow-style: none;
`
export const Name = styled.p``

export const ColumnDetails = styled.div`
   ${tw`p-2`};
`
export const TasksContainer = styled.div``

export const LoaderWrapper = styled.div`
   ${tw`
        w-16 flex items-center justify-center mx-auto
    `}
`

export const TotalAmount = styled.div`
   ${tw`rounded flex justify-between p-2 bg-transparentBasic16`}
`
export const Header = styled.div`
   ${tw`
      m-1 flex justify-between
   `}
`
export const TaskCount = styled(ButtonFontAAMediumBasic600)`
   ${tw`
      rounded-full h-4 ml-2 flex justify-center items-center px-2 py-1 bg-transparentPrimary8 border border-solid border-basic400
   `};
`
export const Container = styled.div`
   ${tw`
      flex items-center ml-24px
   `}
`
export const Actions = styled.div`
   ${tw`
      flex items-center cursor-pointer
   `}
`
export const LoginIconContainer = styled.span`
   ${tw`
      mr-2
   `}
`
export const ScrollerContainer = styled.div`
   max-height: 85%;
   ${tw`flex-grow box-border`}
   overflow-y: scroll;
   ::-webkit-scrollbar {
      display: none;
   }
   scrollbar-width: none;
   -ms-overflow-style: none;
`

export const scrollerStyles = {
   padding: '8px'
}
