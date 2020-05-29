import React from 'react'
import '../../../styles/tailwind.css'
import {PaginationButton} from './PaginationButton'
import Svg from './PageSvg/LeftSideSvg.svg'
export default {
    component:PaginationButton,
    title:'ECommers/Button'
}

const SvgImg=<img style={{filter:'invert(100)'}} src={Svg}/>

export const Button = () => <PaginationButton svg={SvgImg}/>