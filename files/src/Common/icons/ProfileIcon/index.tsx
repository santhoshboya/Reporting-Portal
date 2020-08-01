import * as React from 'react'

function ProfileIcon(props) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <path
            fill='#3E4C59'
            d='M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'
            opacity={0.3}
         />
         <path
            fill='#3E4C59'
            d='M3 20.2c.388-4.773 4.262-7.2 8.983-7.2 4.788 0 8.722 2.293 9.015 7.2.012.195 0 .8-.751.8H3.727c-.25 0-.747-.54-.726-.8z'
         />
      </svg>
   )
}

export default ProfileIcon
