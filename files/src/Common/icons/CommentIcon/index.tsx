import * as React from 'react'

interface CommentIconProps {
   width: number
   height: number
   fill: string
}
function CommentIcon(props: CommentIconProps): JSX.Element {
   const { height, width, fill } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M3.797 1.66c-1.127.171-2.02.997-2.213 2.12-.135.782-.25 1.777-.25 2.887s.115 2.104.25 2.887c.166.964.847 1.709 1.75 2.009v2.269c0 .516.56.836 1.005.574l4.077-2.41c1.476-.024 2.8-.172 3.787-.322 1.127-.172 2.02-.997 2.213-2.12.135-.783.25-1.777.25-2.887s-.115-2.105-.25-2.887c-.193-1.123-1.086-1.949-2.213-2.12A28.226 28.226 0 008 1.333c-1.643 0-3.124.162-4.203.327z'
            clipRule='evenodd'
            opacity={0.25}
         />
         <path
            fill='#3E4C59'
            fillRule='evenodd'
            d='M4.667 4.667a.666.666 0 100 1.333h6.666a.667.667 0 100-1.333H4.667zm0 2.666a.667.667 0 100 1.334h2.666a.667.667 0 100-1.334H4.667z'
            clipRule='evenodd'
         />
      </svg>
   )
}
CommentIcon.defaultProps = {
   width: 16,
   height: 16,
   fill: '#3E4C59'
}

export default CommentIcon
