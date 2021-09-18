import * as React from 'react'

function DrawerIcon(props) {
   return (
      <svg width={64} height={56} fill='none' viewBox='0 0 64 56' {...props}>
         <rect
            width={56}
            height={56}
            x={4}
            fill='#ffffff'
            fillOpacity={0.08}
            rx={4}
         />
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M42 31v4a2 2 0 01-2 2H24a2 2 0 01-2-2v-4h4.28l.543 1.633A2.002 2.002 0 0028.721 34h6.661a2 2 0 001.789-1.106L38.118 31H42z'
            clipRule='evenodd'
         />
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M22.563 29l3.364-5.98A1.999 1.999 0 0127.67 22h8.66a2 2 0 011.744 1.02L41.438 29h-3.32a2 2 0 00-1.789 1.106L35.382 32h-6.661l-.544-1.633A2.003 2.003 0 0026.279 29h-3.716z'
            clipRule='evenodd'
            opacity={0.3}
         />
      </svg>
   )
}

export default DrawerIcon
