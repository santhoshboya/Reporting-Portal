import * as React from 'react'

function HistoryIcon(props) {
   return (
      <svg width={64} height={56} fill='none' viewBox='0 0 64 56' {...props}>
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M32 38a9 9 0 11.001-18.001A9 9 0 0132 38z'
            clipRule='evenodd'
            opacity={0.3}
         />
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M31.465 23.962a.5.5 0 01.498-.462h.084a.5.5 0 01.498.45L33 28.5l3.248 1.856c.156.09.252.255.252.434v.055a.5.5 0 01-.632.483l-4.47-1.22a.498.498 0 01-.366-.52l.433-5.626z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default HistoryIcon
