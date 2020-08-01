import React, { Component } from 'react'

interface Props {
   width?: number
   height?: number
}

class DeleteIcon extends Component<Props> {
   static defaultProps = {
      width: 14,
      height: 14
   }
   render() {
      return (
         <svg
            width={14}
            height={16}
            fill='none'
            viewBox='0 0 14 16'
            {...this.props}
         >
            <path
               fill='#171F46'
               fillRule='evenodd'
               d='M3.25 1.806C3.25.81 4.034 0 5 0h4c.966 0 1.75.809 1.75 1.806v1.549h2.5c.414 0 .75.346.75.774a.762.762 0 01-.75.774h-.5v9.29c0 .998-.784 1.807-1.75 1.807H3c-.966 0-1.75-.809-1.75-1.806v-9.29h-.5A.763.763 0 010 4.129c0-.428.336-.774.75-.774h2.5V1.806zM5 1.548a.254.254 0 00-.25.258v1.29h4.5v-1.29A.254.254 0 009 1.548H5zM2.75 5.161v9.032c0 .143.112.259.25.259h1.5v-9.29H2.75zM8 14.451H6v-9.29h2v9.29zm1.5 0H11c.138 0 .25-.115.25-.258V5.162H9.5v9.29z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default DeleteIcon
