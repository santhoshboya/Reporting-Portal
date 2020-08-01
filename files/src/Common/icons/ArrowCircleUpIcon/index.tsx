import React, { Component } from 'react'

interface ArrowCircleUpIconProps {
   width?: number
   height?: number
   fill?: string
}

class ArrowCircleUpIcon extends Component<ArrowCircleUpIconProps> {
   static defaultProps = {
      width: 24,
      height: 24,
      fill: '#616E7C'
   }
   render() {
      const { width, height, fill } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 24 24'
            {...this.props}
         >
            <path
               fill={fill}
               fillRule='evenodd'
               d='M12.707 7.293a.992.992 0 00-.702-.292H12c-.036 0-.066.015-.101.02-.092.01-.184.02-.271.054-.07.029-.126.075-.187.117-.042.03-.091.047-.13.085l-3 2.862a1 1 0 101.381 1.446L11 10.336V16a1 1 0 002 0v-5.585l1.293 1.293a1.001 1.001 0 001.415-1.415l-3-3zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8m0-18C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default ArrowCircleUpIcon
