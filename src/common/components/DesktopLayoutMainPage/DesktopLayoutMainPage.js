import React, { Component } from 'react'
import { DesktopLayoutMainPageDiv } from './styledComponent'
import { PageHeader } from '../PageHeader'

class DesktopLayoutMainPage extends Component {
   render() {
      const { userName, profilePic, rpFeatures } = this.props
      return (<DesktopLayoutMainPageDiv>
         <PageHeader userName={userName} rpFeatures={rpFeatures} src={profilePic} />
         {this.props.children}
      </DesktopLayoutMainPageDiv>);
   }
}
export { DesktopLayoutMainPage }
