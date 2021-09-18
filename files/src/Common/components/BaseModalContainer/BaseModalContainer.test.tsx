import React from 'react'
import { render } from '@testing-library/react'
import styled from 'styled-components'
import '@testing-library/jest-dom/extend-expect'

import BaseModalContainer from '.'

describe('Base Modal Container', () => {
   let Children
   beforeEach(() => {
      Children = styled.div`
         width: 300px;
         height: 300px;
         background-color: red;
      `
   })
   function openModal(ref): void {
      ref.current.openModal()
   }

   it('Should test base modal container', async () => {
      const modalRef = React.createRef<BaseModalContainer>()
      const { getByTestId } = render(
         <BaseModalContainer ref={modalRef}>
            <Children />
         </BaseModalContainer>
      )
      openModal(modalRef)

      expect(getByTestId('aria-modal')).toBeInTheDocument()
   })
})
