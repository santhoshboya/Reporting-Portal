import * as React from 'react'

function FilledDrawerIcon(props) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <path
            fill='#0967D2'
            fillRule='evenodd'
            d='M22 15v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4h4.28l.543 1.633A2.003 2.003 0 008.721 18h6.661a2 2 0 001.789-1.106L18.118 15H22z'
            clipRule='evenodd'
         />
         <path
            fill='#0967D2'
            fillRule='evenodd'
            d='M2.563 13l3.364-5.98A1.998 1.998 0 017.67 6h8.66a2 2 0 011.744 1.02L21.436 13h-3.319a2 2 0 00-1.789 1.106L15.382 16H8.721l-.544-1.633A2.002 2.002 0 006.279 13H2.563z'
            clipRule='evenodd'
            opacity={0.3}
         />
      </svg>
   )
}

export default FilledDrawerIcon
