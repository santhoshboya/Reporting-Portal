import * as React from 'react'

interface StarIconProps {
   isSelected: boolean
   color: string
}

function StarIcon({ isSelected, color, ...rest }: StarIconProps) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...rest}>
         <path
            fill={isSelected ? color : '#7B8794'}
            fillRule='evenodd'
            d='M17.562 21a1 1 0 01-.463-.112l-5.1-2.664-5.097 2.664a1 1 0 01-1.448-1.057l.97-5.628-4.12-3.985a1.003 1.003 0 01-.255-1.027.998.998 0 01.808-.681l5.7-.828 2.548-5.126c.338-.68 1.453-.68 1.79 0l2.549 5.126 5.7.828a1 1 0 01.552 1.708l-4.12 3.985.97 5.628a.997.997 0 01-.985 1.17z'
            clipRule='evenodd'
         />
      </svg>
   )
}
StarIcon.defaultProps = {
   color: 'blue'
}
export default StarIcon
