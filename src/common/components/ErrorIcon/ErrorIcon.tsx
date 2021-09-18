import React, { Component } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import './index.css'
interface ErrorIconProps{
   className:string
}
class ErrorIcon extends Component<ErrorIconProps> {
   render() {
      const { className } = this.props
      return <MdErrorOutline className={className} />
   }
}
export { ErrorIcon }
