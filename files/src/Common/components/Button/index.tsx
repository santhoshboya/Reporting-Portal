import React, { Component, Fragment } from 'react'
import { API_FETCHING, APIStatus, API_INITIAL } from '@ib/api-constants'

import { BaseButton } from './BaseButton'
import { variants, shapes, types, sizes } from './constants'
import { getShapeCss, getSizeCss } from './styledComponents'
import { OutlineButton } from './OutlineButton'

interface CommonButtonProps {
   id?: string
   height?: string
   width?: string
   startEnhancer?: () => any
   endEnhancer?: () => any
   variant: string
   shape: string
   size: string
   type: string
   text: string
   onClick: (e: any) => void
   disabled: boolean
   isLoading: boolean
   apiStatus: APIStatus
   className: string
}

export default class Button extends Component<CommonButtonProps> {
   static defaultProps = {
      variant: variants.primary,
      shape: shapes.rectangular,
      size: sizes.small,
      type: types.filled,
      text: '',
      onClick: (e: any) => {},
      disabled: false,
      isLoading: false,
      apiStatus: API_INITIAL,
      className: ''
   }

   static variants = variants
   static shapes = shapes
   static sizes = sizes
   static types = types

   getButtonByType = passedOnProps => {
      const { type } = this.props
      const { outline, filled } = types
      switch (type) {
         case outline:
            return <OutlineButton {...passedOnProps} />
         case filled:
         default:
            return <BaseButton {...passedOnProps} />
      }
   }

   render() {
      const {
         props: {
            apiStatus,
            shape,
            size,
            isLoading: loading,
            onClick,
            ...otherProps
         },
         getButtonByType
      } = this

      const isLoading = loading || apiStatus === API_FETCHING
      const totalPassingProps = {
         ...otherProps,
         onClick: isLoading ? () => {} : onClick,
         isLoading,
         shapeCss: getShapeCss(shape),
         sizeCss: getSizeCss(size)
      }

      return <Fragment>{getButtonByType(totalPassingProps)}</Fragment>
   }
}
