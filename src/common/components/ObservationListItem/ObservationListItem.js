import React, { Component } from 'react'
import './index.css'
import {
   TableRow,
   TableData,
   RectangleSeverity,
   RectangleActionStatus,
   SevertyStatus,
   ObservationStatus,
   PersonData,
   PersonDetails
} from './styledComponent'
import strings from '../../i18n/strings.json'
import { Image } from '../Image'
class ObservationListItem extends Component {
   render() {
      const {
         title,
         reportedOn,
         assignedTo,
         severty,
         status,
         dueDate,
         messages,
         src
      } = this.props
      return (
         <TableRow>
            <TableData>
               <TableData>{title}</TableData>
            </TableData>
            <TableData>
               <TableData>{reportedOn}</TableData>
            </TableData>
            <TableData>
               <PersonDetails>
                  <Image src={src} className={'persons-xs'}></Image>
                  <PersonData>
                     <TableData>{'santhosh'}</TableData>
                     <TableData>{9441406486}</TableData>
                  </PersonData>
               </PersonDetails>
            </TableData>
            <TableData>
               <RectangleSeverity bgColor={'#ff0b37'}>
                  <SevertyStatus>{severty}</SevertyStatus>
               </RectangleSeverity>
            </TableData>
            <TableData>
               <RectangleActionStatus>
                  <ObservationStatus>{status}</ObservationStatus>
               </RectangleActionStatus>
            </TableData>
            <TableData>
               <TableData>{dueDate}</TableData>
            </TableData>
            <TableData>
               <Image
                  className={'message-icon'}
                  src={
                     'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/25193dcb-b81b-48a0-8ce4-ef53a4775749.svg'
                  }
               />
            </TableData>
         </TableRow>
      )
   }
}
export { ObservationListItem }
