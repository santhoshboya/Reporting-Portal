import React from 'react'

interface IconProps {
   width: string
   height: string
   fill: string
   className?: string
}

export default function UpArrow(props: IconProps): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 20 20'
         {...other}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M15 12.5a.83.83 0 01-.534-.193L9.99 8.577l-4.468 3.596a.833.833 0 11-1.044-1.299l5-4.023a.83.83 0 011.056.01l5 4.166A.834.834 0 0115 12.5z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

UpArrow.defaultProps = {
   width: '20',
   height: '20',
   fill: '#7B8794'
}
