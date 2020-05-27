import React, { Component } from 'react'
import './index.css'
import {
   TableRow,
   TableHeading,
   PersonTypeDiv
} from './styledComponent'

import strings from '../../i18n/strings.json'
import { Image } from '../Image'
class ObservationListHeader extends Component {
   render() {
      const {
         personType,src
      } = this.props
      return (
         <TableRow>
            <TableHeading>{strings.userFeatures.title}</TableHeading>
            <TableHeading>
               <PersonTypeDiv>
                  {strings.userFeatures.reportedOn}
                  <Image 
                     className={'Chevron-Down-2'}
                     src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg"/>
               </PersonTypeDiv>
            </TableHeading>
            <TableHeading>{personType}</TableHeading>
            <TableHeading>{strings.userFeatures.severty}</TableHeading>
            <TableHeading>{strings.userFeatures.status}</TableHeading>
            <TableHeading>
                  <PersonTypeDiv>
                     {strings.userFeatures.dueDate}
                     <Image 
                        className={'Chevron-Down-2'}
                        src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg"/>
                  </PersonTypeDiv>
            </TableHeading>
            <TableHeading>{strings.userFeatures.messages}</TableHeading>
         </TableRow>
      )
   }
}
export { ObservationListHeader }
