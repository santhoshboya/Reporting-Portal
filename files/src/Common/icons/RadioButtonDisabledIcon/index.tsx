import React from 'react'

interface Props {
   width: number
   height: number
}

const RadioButtonDisabledIcon = (props: Props) => (
   <svg
      width={props.width}
      height={props.height}
      fill='none'
      viewBox='0 0 20 20'
      {...props}
   >
      <path
         stroke='#7B8794'
         strokeOpacity={0.16}
         d='M19.5 10c0 5.247-4.253 9.5-9.5 9.5S.5 15.247.5 10 4.753.5 10 .5s9.5 4.253 9.5 9.5z'
      />
   </svg>
)

RadioButtonDisabledIcon.defaultProps = {
   width: 20,
   height: 20
}

export default RadioButtonDisabledIcon
