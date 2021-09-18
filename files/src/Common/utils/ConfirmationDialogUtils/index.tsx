import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import ConfirmPopup from '../../components/ConfirmPopup'

interface ShowConfirmDialogProps {
   message: string
   onConfirm: Function
   onCancel?: any
   cancelText?: string
   confirmText?: string
   MessageTypo?: React.ElementType
}

export const showConfirmDialog = (props: ShowConfirmDialogProps) =>
   confirmAlert({
      customUI: ({ onClose }) => <ConfirmPopup onClose={onClose} {...props} />
   })
