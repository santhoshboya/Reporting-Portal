import styled from 'styled-components'
import tw from 'twin.macro'
import Button from '../../../../Common/components/Button'
import ButtonWithLoader from '../../../../Common/components/ButtonWithLoader'

export const ButtonWrapper = styled('div')`
   ${tw`flex justify-end items-center`};
   position: relative;
   bottom: 0%;
`

export const ModalContainer = styled('div')`
   height: 80%;
`
export const MainContainer = styled('div')`
   ${tw`flex flex-col h-full m-12px`};
`
export const TargetsBox = styled('div')`
   ${tw`
   flex
   justify-between
   flex-wrap
   flex-grow
    `};
   min-height: 190px;
   min-width: 200px;
`

export const SaveButton = styled(ButtonWithLoader)`
   ${tw`ml-2 p-0 h-8 flex items-center justify-center`};
   border-radius: 4px;
`

export const CancelButton = styled(Button)`
   ${tw`mr-2 h-8 flex items-center justify-center`};
`
export const modalCustomStyles = {
   content: {
      margin: '5% 20%',
      minWidth: '300px'
   },
   overlay: {
      background: 'transparent'
   }
}
