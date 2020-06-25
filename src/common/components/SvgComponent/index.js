import React, { Component } from 'react'

// interface SvgComponentProps{
//    // renderComponent:React.ComponentType
//    // className:string
// }
class SvgComponent extends Component {
   render() {
      const {
         renderComponent: RenderComponent,
         className,
         ...other
      } = this.props
      return (
         <span className={className}>
            <RenderComponent {...other} />
         </span>
      )
   }
}

export default SvgComponent
