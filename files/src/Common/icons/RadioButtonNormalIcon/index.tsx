import React from 'react'

interface Props {
   width: number
   height: number
}

const RadioButtonNormalIcon = (props: Props) => (
   <svg
      width={props.width}
      height={props.height}
      fill='none'
      viewBox='0 0 20 20'
      {...props}
   >
      <path
         stroke='#9AA5B1'
         d='M19.5 10c0 5.247-4.253 9.5-9.5 9.5S.5 15.247.5 10 4.753.5 10 .5s9.5 4.253 9.5 9.5z'
      />
   </svg>
)

RadioButtonNormalIcon.defaultProps = {
   width: 20,
   height: 20
}

export default RadioButtonNormalIcon
