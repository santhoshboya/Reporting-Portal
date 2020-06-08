import React, { Component } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import './index.css'
class ErrorIcon extends Component {
   render() {
      const { className } = this.props
      return <MdErrorOutline className={className} />
   }
}
export { ErrorIcon }
