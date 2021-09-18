import * as React from 'react'

function NotificationIcon(props) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M11.5 3A4.5 4.5 0 007 7.5V12H5.5a1.5 1.5 0 000 3h13a1.5 1.5 0 000-3H17V7.5A4.5 4.5 0 0012.5 3h-1z'
            clipRule='evenodd'
         />
         <rect
            width={4}
            height={4}
            x={10}
            y={16}
            fill='#3E4C59'
            opacity={0.3}
            rx={2}
         />
      </svg>
   )
}

export default NotificationIcon
