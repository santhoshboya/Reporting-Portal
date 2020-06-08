import React, { Component } from 'react'
import { DesktopLayoutMainPageDiv } from './styledComponent'
import { PageHeader } from '../PageHeader'
import { observer } from 'mobx-react'
@observer
class DesktopLayoutMainPage extends Component {
   render() {
      const {
         userName,
         profilePic,
         rpFeatures,
         currentPage,
         userType,
         navigateTOPage
      } = this.props
      return (
         <DesktopLayoutMainPageDiv>
            <PageHeader
               userName={userName}
               navigateTOPage={navigateTOPage}
               userType={userType}
               currentPage={currentPage}
               rpFeatures={rpFeatures}
               src={profilePic}
            />
            {this.props.children}
         </DesktopLayoutMainPageDiv>
      )
   }
}
export { DesktopLayoutMainPage }
