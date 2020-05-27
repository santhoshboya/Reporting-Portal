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
         personType
      } = this.props
      const {title,reportedOn,severty,status,dueDate,messages}=strings.userFeatures
      return (
         <TableRow>
            <TableHeading>{title}</TableHeading>
            <TableHeading>
               <PersonTypeDiv>
                  {reportedOn}
                  <Image 
                     className={'Chevron-Down-2'}
                     src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg"/>
               </PersonTypeDiv>
            </TableHeading>
            <TableHeading>{personType}</TableHeading>
            <TableHeading>{severty}</TableHeading>
            <TableHeading>{status}</TableHeading>
            <TableHeading>
                  <PersonTypeDiv>
                     {dueDate}
                     <Image 
                        className={'Chevron-Down-2'}
                        src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg"/>
                  </PersonTypeDiv>
            </TableHeading>
            <TableHeading>{messages}</TableHeading>
         </TableRow>
      )
   }
}
export { ObservationListHeader }
