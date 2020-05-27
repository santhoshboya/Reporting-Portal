import React, { Component } from 'react'
import {ImageElement} from './styledComponent'
import style from './style.css'
class Image extends Component {
    render() {
        const {src,className}=this.props;
        return (
            <ImageElement className={className} src={src}></ImageElement>
        )
    }
}
export {Image};
