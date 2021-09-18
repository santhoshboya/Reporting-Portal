import React, { Component } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { observer } from 'mobx-react'

import { toastTypes } from '../../constants/ToastTypes'
import colors from '../../themes/Colors'
import {
   ToasterWrapper,
   ToastTitle,
   ToastMessage,
   ToastMessageWrapper
} from './styledComponents'
import './styles.css'

interface ToasterProps {
   type: string
   message: string
   title: string
   className?: string
}

@observer
class Toast extends Component<ToasterProps> {
   static defaultProps = {
      title: ''
   }

   getTickColor = () => {
      const { type } = this.props
      switch (type) {
         case toastTypes.dark:
            return colors.pimary900
         case toastTypes.primary:
            return colors.primary500Default
         case toastTypes.info:
            return colors.info500
         case toastTypes.success:
            return colors.success500Default
         case toastTypes.warning:
            return colors.warning500
         case toastTypes.danger:
            return colors.danger500
         default:
            console.warn('enter correct type of toaster')
            return colors.black
      }
   }

   render() {
      const { message, title, className } = this.props
      const { getTickColor } = this

      return (
         <ToasterWrapper className={className}>
            <IconContext.Provider
               value={{
                  color: getTickColor(),
                  className: 'tickmark'
               }}
            >
               <AiOutlineCheckCircle />
            </IconContext.Provider>
            <ToastMessageWrapper>
               {title !== '' && <ToastTitle>{title}</ToastTitle>}
               <ToastMessage>{message}</ToastMessage>
            </ToastMessageWrapper>
         </ToasterWrapper>
      )
   }
}

export default Toast
