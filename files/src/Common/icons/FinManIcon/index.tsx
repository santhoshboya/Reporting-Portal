import * as React from 'react'

function FinManIcon(props) {
   return (
      <svg width={40} height={40} fill='none' viewBox='0 0 40 40' {...props}>
         <mask
            id='prefix__a'
            width={40}
            height={40}
            x={0}
            y={0}
            maskUnits='userSpaceOnUse'
         >
            <rect width={40} height={40} fill='#CBD2D9' rx={4} />
         </mask>
         <g mask='url(#prefix__a)'>
            <path
               fill='url(#prefix__paint0_linear)'
               d='M40.433-1H-1v42h41.433V-1z'
            />
            <path
               fill='#fff'
               d='M33.048 1.284l-4.156 2.058-5.358 2.647-7.74 3.817 6.57 3.357C15.018 26.746 5.593 26.746 3.922 26.326c2.179 2.655 18.465 7.4 27.116-8.74l4.802 2.461-2.793-18.763z'
            />
            <path
               fill='#fff'
               d='M31.66 19.66a26.983 26.983 0 01-2.397 3.381v15.56h6.11V21.556L31.66 19.66z'
            />
            <path
               fill='#fff'
               d='M20.701 29.288V38.6h6.117V25.559a20.19 20.19 0 01-6.117 3.729z'
               opacity={0.75}
            />
            <path
               fill='#fff'
               d='M15.31 30.555a21.59 21.59 0 01-2.026.096c-.379 0-.758-.016-1.138-.032v7.982h6.11v-8.547c-.97.232-1.954.4-2.946.5z'
               opacity={0.5}
            />
            <path
               fill='#fff'
               d='M3.592 28.117v10.484h6.11v-8.248c-2.567-.428-4.778-1.267-6.11-2.236z'
               opacity={0.25}
            />
         </g>
         <defs>
            <linearGradient
               id='prefix__paint0_linear'
               x1={-1}
               x2={40.433}
               y1={19.999}
               y2={19.999}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#46C7F4' />
               <stop offset={0.37} stopColor='#28A0D6' />
               <stop offset={0.78} stopColor='#0C7ABA' />
               <stop offset={1} stopColor='#016CAF' />
            </linearGradient>
         </defs>
      </svg>
   )
}

export default FinManIcon
