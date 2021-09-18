import React, { Component, Children } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import AriaModal from 'react-aria-modal'

import Colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'
import { CloseIconWrapper, ChildrenWrapper } from './styledComponents'
import styles from './styles.module.css'

interface Props {
   children: React.ReactNode
   hideCloseIcon: boolean
   dialogClass: string
   underlayClass: string
   underlayColor: string
   mounted?: boolean
   onClose?: () => void
   underlayClickExits?: boolean
   minWidth?: string
}

interface State {
   modalIsOpen: boolean
}

@observer
class BaseModalContainer extends Component<Props, State> {
   @observable modalIsOpen = false

   static defaultProps = {
      hideCloseIcon: false,
      dialogClass: styles.baseModalStyles,
      underlayClass: styles.baseModalUnderlayStyles,
      underlayColor: Colors.black32
   }

   openModal = () => {
      this.modalIsOpen = true
   }

   closeModal = () => {
      const { onClose } = this.props
      this.modalIsOpen = false
      onClose && onClose()
   }

   render() {
      const {
         children,
         hideCloseIcon,
         dialogClass,
         underlayClass,
         underlayColor,
         minWidth,
         ...other
      } = this.props
      const { modalIsOpen } = this

      return (
         <AriaModal
            dialogClass={dialogClass}
            underlayClass={underlayClass}
            underlayColor={underlayColor}
            mounted={modalIsOpen}
            onExit={this.closeModal}
            focusDialog
            titleId='react-aria-modal'
            data-testid='aria-modal'
            {...other}
         >
            {hideCloseIcon ? null : (
               <CloseIconWrapper onClick={this.closeModal}>
                  <CloseIcon fill={Colors.blueGreyTwo} />
               </CloseIconWrapper>
            )}

            <ChildrenWrapper width={minWidth}>{children}</ChildrenWrapper>
         </AriaModal>
      )
   }
}

export default BaseModalContainer
