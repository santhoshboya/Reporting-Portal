import React, { Component } from 'react'

interface Props {
   width?: number
   height?: number
}

class EditIcon extends Component<Props> {
   static defaultProps = {
      width: 14,
      height: 14
   }
   render() {
      const { width, height } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 14 16'
            {...this.props}
         >
            <path
               fill='#171F46'
               fillRule='evenodd'
               d='M10.598 1.01a.76.76 0 011.1 0l2.074 2.14a.822.822 0 010 1.136L3.402 14.99a.769.769 0 01-.55.235H.778A.79.79 0 010 14.422v-2.141c0-.213.082-.417.228-.568L10.598 1.01zm-.943 3.243l.975 1.006 1.492-1.541-.974-1.006-1.492 1.541zM9.53 6.394L8.556 5.39l-7 7.225v1.006h.974l7-7.226z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default EditIcon
