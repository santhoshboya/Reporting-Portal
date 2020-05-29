import React, { Component } from 'react'
import { ImageElement } from './styledComponent'
import style from './style.css'
class Image extends Component {
   render() {
      const { src, className, onHandleClick } = this.props
      return <ImageElement onClick={onHandleClick} className={className} src={src}></ImageElement>
   }
}
export { Image }
