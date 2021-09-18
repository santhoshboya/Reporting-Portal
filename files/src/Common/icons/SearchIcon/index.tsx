import React, { Component } from 'react'

interface SearchIconProps {
   width: number
   height: number
}

class SearchIcon extends Component<SearchIconProps> {
   static defaultProps = {
      width: 12,
      height: 12
   }
   render() {
      const { width, height } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 12 12'
            {...this.props}
         >
            <path
               fill='#171F46'
               fillRule='evenodd'
               d='M8.059 4.78a3.28 3.28 0 11-6.56-.002 3.28 3.28 0 016.56.002zm-.472 3.868a4.756 4.756 0 01-2.808.91 4.78 4.78 0 113.869-1.971L12 10.94l-1.06 1.061-3.354-3.353z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SearchIcon
