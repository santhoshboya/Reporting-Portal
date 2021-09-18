import * as React from 'react'

function SidebarMenuIcon(props) {
   return (
      <svg width={64} height={56} fill='none' viewBox='0 0 64 56' {...props}>
         <rect width={7} height={7} x={24} y={20} fill='#3E4C59' rx={1.5} />
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M33 21.5a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4zm-9 9a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4zM34.5 29a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-4a1.5 1.5 0 00-1.5-1.5h-4z'
            clipRule='evenodd'
            opacity={0.3}
         />
      </svg>
   )
}

export default SidebarMenuIcon
