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
class PageHeader extends Component {
   render() {

      const { src, userName, rpFeatures, currentPage, navigateTOPage } = this.props;
      return (
         <PageHeaderDiv>
            <LeftPart>
               <Image
                  className={'logo'}
                  src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9e43886f-8c57-4319-a0a9-e01d50479197.svg" />
               <Title>{strings.userFeatures.reportingPortal}</Title>
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
}
export { PageHeader }
