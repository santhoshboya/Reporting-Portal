import React, { Component } from 'react'
import { PaginationBtn } from './styledComponent'

interface PaginationButtonProps{
   svg:string
   changePage:()=>void
   isDisable:boolean
}

class PaginationButton extends Component<PaginationButtonProps> {
   render() {
      const { svg, changePage, isDisable } = this.props
      const SvgImg = <img alt={'sidebutton'} src={svg} />
      return (
         <PaginationBtn disabled={isDisable} onClick={changePage}>
            {SvgImg}
         </PaginationBtn>
      )
   }
}

export { PaginationButton }
