import React from 'react'
import { styled } from 'twin.macro'

import Colors from '../../themes/Colors'

import BaseModalContainer from '.'

export default {
   title: 'Base Modal Container'
}

const Children = styled.div`
   width: 300px;
   height: 300px;
   background-color: ${Colors.white};
`

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background-color: ${Colors.pinkishOrange};
`

function openModal(ref): void {
   ref.current.openModal()
}
const modalRef = React.createRef<BaseModalContainer>()

export const modal = () => (
   <>
      <BaseModalContainer ref={modalRef}>
         <Children />
      </BaseModalContainer>
      <Container>
         <button onClick={() => openModal(modalRef)}>click me</button>
      </Container>
   </>
)
