import React, { Component } from 'react'
import './index.css'
import {
   PageHeaderDiv,
   LeftPart,
   RightPart,
   Title,
   UserName,
   RpFeatureOne,
   RpFeatureTwo,
   RightSubPartOne,
   RightSubPartTwo,
   RpFeatures
} from './styledComponent'
import strings from '../../i18n/strings.json'
import { Image } from '../Image'
import { ReactModalPopUp } from '../ReactModal'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const customStyles = {
   content: {
      top: '10%',
      left: '85%',
      position: 'absolute',
      width: '200px',
      height: '200px'
   }
}
@observer
class PageHeader extends Component {
   @observable isOpen = false

   closeTab = () => {
      this.isOpen = false
   }
   onHandleClick = () => {
      this.isOpen = true
      console.log('hi.....', this.isOpen)
   }

   render() {
      const {
         reportingPortal,
         assignedToMe,
         myObservations,
         totalObservations,
         categories
      } = strings.rpFeatures
      const {
         src,
         userName,
         rpFeatures,
         currentPage,
         userType,
         navigateTOPage
      } = this.props

      return (
         <PageHeaderDiv>
            <LeftPart>
               <Image
                  className={'logo'}
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9e43886f-8c57-4319-a0a9-e01d50479197.svg'
               />
               <Title>{reportingPortal}</Title>
            </LeftPart>
            <RightPart>
               {userType === 'user' && currentPage !== '' && (
                  <RightSubPartOne>
                     <RpFeatures
                        onClick={() => navigateTOPage(assignedToMe)}
                        className={
                           currentPage === assignedToMe ? 'active-head' : ''
                        }
                     >
                        {assignedToMe}
                     </RpFeatures>
                     <RpFeatures
                        onClick={() => navigateTOPage(myObservations)}
                        className={
                           currentPage === myObservations ? 'active-head' : ''
                        }
                     >
                        {myObservations}
                     </RpFeatures>
                  </RightSubPartOne>
               )}
               {userType === 'Rp' && (
                  <RightSubPartOne>
                     <RpFeatures
                        onClick={() => navigateTOPage(assignedToMe)}
                        className='active-head'
                     >
                        {assignedToMe}
                     </RpFeatures>
                     <RpFeatures onClick={() => navigateTOPage(myObservations)}>
                        {myObservations}
                     </RpFeatures>
                  </RightSubPartOne>
               )}
               {userType === 'Admin' && (
                  <RightSubPartOne>
                     <RpFeatures
                        onClick={() => navigateTOPage(totalObservations)}
                        className='active-head'
                     >
                        {totalObservations}
                     </RpFeatures>
                     <RpFeatures onClick={() => navigateTOPage(categories)}>
                        {categories}
                     </RpFeatures>
                  </RightSubPartOne>
               )}
               <RightSubPartTwo>
                  <UserName>{userName}</UserName>
                  <Image
                     className={'PersonM'}
                     src={src}
                     onHandleClick={this.onHandleClick}
                  />
                  <ReactModalPopUp
                     customStyles={customStyles}
                     btnStyle={'sign-out-btn'}
                     BtnValue={'Sign Out'}
                     userName={userName}
                     handleClick={this.closeTab}
                     isOpen={this.isOpen}
                     src={src}
                     profilePicStyle={'PersonM'}
                  />
               </RightSubPartTwo>
            </RightPart>
         </PageHeaderDiv>
      )
   }
}
export { PageHeader }

/*class PageHeader extends Component {
   render() {
      const { reportingPortal, assignedToMe, myObservations, totalObservations, categories } = strings.userFeatures
      const { src, userName, rpFeatures, currentPage, userType, navigateTOPage } = this.props;
      return (
         <PageHeaderDiv>
            <LeftPart>
               <Image
                  className={'logo'}
                  src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9e43886f-8c57-4319-a0a9-e01d50479197.svg" />
               <Title>{reportingPortal}</Title>
            </LeftPart>
            <RightPart>
               {rpFeatures &&
                  <RightSubPartOne>
                     <RpFeatures onClick={() => navigateTOPage(rpFeatures[0])} className={currentPage === rpFeatures[0] ? "active-head" : ""}>{rpFeatures[0]}</RpFeatures>
                     <RpFeatures onClick={() => navigateTOPage(rpFeatures[1])} className={currentPage === rpFeatures[1] ? "active-head" : ""}>{rpFeatures[1]}</RpFeatures>
                  </RightSubPartOne>
               }
               <RightSubPartTwo>
                  <UserName>{userName}</UserName>
                  <Image className={'PersonM'} src={src} />
               </RightSubPartTwo>
            </RightPart>
         </PageHeaderDiv>
      );
   }
} */
