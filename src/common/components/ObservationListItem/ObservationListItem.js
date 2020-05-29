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
         src,
         onClickObservation,
      } = this.props
      let bgColor = (severty === "HIGH" ? "#ff0b37" : (severty === "LOW" ? "#2dca73" : "#ffb800"))
      return (
         <TableRow data-testid="observation-list-item" onClick={onClickObservation}>
            <TableData>{title}</TableData>
            <TableData>{reportedOn}</TableData>
            <TableData>
               <PersonDetails>
                  <Image src={src} className={'persons-xs'}></Image>
                  <PersonData>
                     {assignedTo.name}<br />
                     ph:{assignedTo.phone_no}
                  </PersonData>
               </PersonDetails>
            </TableData>
            <TableData>
               <RectangleSeverity bgColor={bgColor}>
                  <SevertyStatus>{severty}</SevertyStatus>
               </RectangleSeverity>
            </TableData>
            <TableData>
               <RectangleActionStatus>
                  <ObservationStatus>{status}</ObservationStatus>
               </RectangleActionStatus>
            </TableData>
            <TableData>{dueDate}</TableData>
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
