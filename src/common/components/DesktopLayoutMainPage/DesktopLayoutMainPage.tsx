import React, { Component } from 'react'
import { DesktopLayoutMainPageDiv } from './styledComponent'
import { PageHeader } from '../PageHeader'
import { observer } from 'mobx-react'

type DesktopLayoutMainPageProps={
   userName:string,
   profilePic:string,
   rpFeatures:Array<string>,
   currentPage:string,
   userType:string,
   navigateTOPage:(value:string)=>void
}

@observer
class DesktopLayoutMainPage extends Component<DesktopLayoutMainPageProps> {
   static defaultProps={
      userName:"",
      profilePic:"",
      rpFeatures:[],
      currentPage:"",
      userType:"",
      navigateTOPage:()=>{}
   }
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
