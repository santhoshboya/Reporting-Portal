import * as React from 'react'

interface Props {
   width?: number
   height?: number
}

class MenuIcon extends React.Component<Props> {
   static defaultProps = {
      width: 14,
      height: 3
   }
   render() {
      const { width, height } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 14 3'
            {...this.props}
         >
            <path
               fill='#7E858E'
               fillRule='evenodd'
               d='M0 1.5a1.5 1.5 0 103.001-.001A1.5 1.5 0 000 1.5zm5.5 0a1.5 1.5 0 103.001-.001A1.5 1.5 0 005.5 1.5zm7 1.5a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0112.5 3z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default MenuIcon
