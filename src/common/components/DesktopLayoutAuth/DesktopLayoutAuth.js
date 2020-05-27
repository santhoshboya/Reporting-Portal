import React, { Component } from 'react'
import { DesktopLayoutAuthDiv } from './styledComponent'
class DesktopLayoutAuth extends Component {
   render() {
      return <DesktopLayoutAuthDiv>{this.props.children}</DesktopLayoutAuthDiv>
   }
}
export { DesktopLayoutAuth }
