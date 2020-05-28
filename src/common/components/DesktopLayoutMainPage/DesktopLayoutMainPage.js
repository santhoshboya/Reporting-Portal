import React, { Component } from 'react'
import { DesktopLayoutMainPageDiv } from './styledComponent'
import { PageHeader } from '../PageHeader'

class DesktopLayoutMainPage extends Component {
   render() {
      return <DesktopLayoutMainPageDiv>
         <PageHeader />
         {this.props.children}
      </DesktopLayoutMainPageDiv>
   }
}
export { DesktopLayoutMainPage }
