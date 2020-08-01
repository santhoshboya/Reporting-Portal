import { SerializedStyles } from '@emotion/core'

export interface ButtonProps {
   id?: string
   className?: string
   width?: string
   height?: string
   startEnhancer?: () => any
   endEnhancer?: () => any
   onClick: (e: any) => void
   text: string
   variant: string
   shapeCss: SerializedStyles
   sizeCss: SerializedStyles
   isLoading: boolean
   disabled: boolean
}

export interface StyledButtonProps {
   width?: string
   height?: string
   variant: string
   isLoading: boolean
   shapeCss: SerializedStyles
   sizeCss: SerializedStyles
}
