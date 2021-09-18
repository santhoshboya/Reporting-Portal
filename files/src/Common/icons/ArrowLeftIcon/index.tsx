import * as React from 'react'

interface ArrowLeftIconProps {
   width: number
   height: number
}
function ArrowLeftIcon(props: ArrowLeftIconProps): JSX.Element {
   return (
      <svg
         width={props.width}
         height={props.height}
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fillRule='evenodd'
            d='M7 11.333a.665.665 0 01-.471-1.138l2.203-2.203-2.12-2.195a.668.668 0 01.959-.927l2.575 2.667a.665.665 0 01-.008.934l-2.667 2.667c-.13.13-.3.195-.471.195'
            clipRule='evenodd'
         />
      </svg>
   )
}
ArrowLeftIcon.defaultProps = {
   width: 16,
   height: 16
}

export default ArrowLeftIcon
