import * as React from 'react'

interface Props {
   width: number
   height: number
   fill: string
}

const CalenderIcon = (props: Props) => (
   <svg viewBox='0 0 24 24' {...props}>
      <path
         fill={props.fill}
         fillRule='evenodd'
         d='M7 16c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm5-1h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H6c-.551 0-1-.449-1-1v-6h14v6c0 .551-.449 1-1 1zM6 6h1v1c0 .55.45 1 1 1s1-.45 1-1V6h6v1c0 .55.45 1 1 1s1-.45 1-1V6h1c.551 0 1 .449 1 1v4H5V7c0-.551.449-1 1-1zm12-2h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H9V3c0-.55-.45-1-1-1s-1 .45-1 1v1H6C4.346 4 3 5.346 3 7v12c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3V7c0-1.654-1.346-3-3-3z'
         clipRule='evenodd'
      />
   </svg>
)

CalenderIcon.defaultProps = {
   width: 24,
   height: 24
}
export default CalenderIcon
