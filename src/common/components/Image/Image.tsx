import React, { Component } from 'react'
import { ImageElement } from './styledComponent'
interface ImageProps{
   src:string,
   className?:string,
   onHandleClick?:()=>void
}
class Image extends Component <ImageProps>{
   render() {
      const { src, className, onHandleClick } = this.props
      return (
         <ImageElement
            onClick={onHandleClick}
            className={className}
            src={src}
         ></ImageElement>
      )
   }
}
export { Image }
