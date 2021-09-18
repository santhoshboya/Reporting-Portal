import React, { Component } from 'react'

interface Props {
   width?: number
   height?: number
}

class BackArrowIcon extends Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16
   }
   render() {
      const { width, height } = this.props
      return (
         <svg width={width} height={height} fill='none' viewBox='0 0 16 16'>
            <path
               fill='#171F46'
               fillRule='evenodd'
               d='M9.874 2L11 3.15 6.253 8 11 12.85 9.874 14l-5.19-5.3c-.38-.39-.38-1.01 0-1.4L9.875 2z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default BackArrowIcon
