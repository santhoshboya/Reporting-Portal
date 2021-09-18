import React from 'react'

interface Props {
   width?: number
   height?: number
}

const RadioButtonSelectedIcon = (props: Props) => (
   <svg
      width={props.width}
      height={props.height}
      fill='none'
      viewBox='0 0 20 20'
   >
      <path
         fill='#0967D2'
         fillRule='evenodd'
         d='M10 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z'
         clipRule='evenodd'
      />
   </svg>
)

RadioButtonSelectedIcon.defaultProps = {
   width: 20,
   height: 20
}

export default RadioButtonSelectedIcon
