import React, { Component } from 'react'
import { DesktopLayoutMainPageDiv } from './styledComponent'
class DesktopLayoutMainPage extends Component {
   render() {
   return <DesktopLayoutMainPageDiv>{this.props.children}</DesktopLayoutMainPageDiv>
   }
}
export { DesktopLayoutMainPage }
