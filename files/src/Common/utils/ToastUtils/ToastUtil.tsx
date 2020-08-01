import React from 'react'
import { css } from 'glamor'
import { toast, cssTransition } from 'react-toastify'

import Toast from '../../components/Toast'
import { toastTypes } from '../../constants/ToastTypes'
import '../../components/Toast/styles.css'

const Slide = cssTransition({
   enter: 'slideInUp',
   exit: 'slideDown',
   duration: 300
})

let toastId: string | number

function dismissToast(): void {
   if (toast.isActive(toastId)) {
      toast.dismiss(toastId)
   }
}

function getToastTypeClass(type) {
   let toastClassName: string
   switch (type) {
      case toastTypes.dark:
         toastClassName = 'toast-dark'
         break
      case toastTypes.primary:
         toastClassName = 'toast-primary'
         break
      case toastTypes.info:
         toastClassName = 'toast-info'
         break
      case toastTypes.success:
         toastClassName = 'toast-success'
         break
      case toastTypes.warning:
         toastClassName = 'toast-warning'
         break
      case toastTypes.danger:
         toastClassName = 'toast-danger'
         break
      default:
         console.warn('enter correct type of toaster')
         toastClassName = 'toast-dark'
   }
   return toastClassName
}

export const showToast = props => {
   const { type, message, title } = props
   dismissToast()
   toastId = toast(<Toast {...{ message, title, type }} />, {
      bodyClassName: css({
         fontFamily: 'HKGrotesk',
         color: 'white' //NOTE:changed color of the text
      }),

      transition: Slide,
      position: 'bottom-center',
      autoClose: 5000,
      className: `${getToastTypeClass(type)} toast`
   })
}
