import * as React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next' // eslint-disable-line
import 'twin.macro'

import {
   YesButton,
   NoButton,
   Container,
   Message,
   MainContainer,
   ButtonsContainer
} from './styledComponents'

export interface ConfirmPopupProps extends WithTranslation {
   MessageTypo?: React.ElementType
   onConfirm: Function
   onClose: any
   onCancel?: any
   message: string
   confirmText?: string
   cancelText?: string
}

class ConfirmPopup extends React.Component<ConfirmPopupProps> {
   onClickNo = (): void => {
      const { onCancel, onClose } = this.props
      if (onCancel) onCancel()
      onClose()
   }

   onClickYes = (): void => {
      const { onConfirm, onClose } = this.props

      onConfirm()
      onClose()
   }
   render(): React.ReactNode {
      const { MessageTypo, message, confirmText, cancelText, t } = this.props
      const yesText = confirmText
         ? confirmText
         : t('common:confirmationAlert.yes')
      const noText = cancelText ? cancelText : t('common:confirmationAlert.no')
      return (
         <MainContainer>
            <Container>
               {MessageTypo ? (
                  <MessageTypo>{message}</MessageTypo>
               ) : (
                  <Message>{message}</Message>
               )}

               <ButtonsContainer>
                  <NoButton
                     variant={NoButton.variants.basic}
                     onClick={this.onClickNo}
                     text={noText}
                  ></NoButton>
                  <YesButton
                     onClick={this.onClickYes}
                     text={yesText}
                  ></YesButton>
               </ButtonsContainer>
            </Container>
         </MainContainer>
      )
   }
}

export default withTranslation()(ConfirmPopup)
