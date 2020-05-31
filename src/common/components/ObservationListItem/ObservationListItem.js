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
   PersonDetails,
   MsgCount
} from './styledComponent'
import strings from '../../i18n/strings.json'
import { Image } from '../Image'

const PUBLIC = 'Public'
const PRIVATE = 'Private'
class ObservationListItem extends Component {
   render() {
      const {
         title,
         reportedOn,
         pairedPerson,
         severty,
         status,
         dueDate,
         messages,
         src,
         onClickObservation,
         dueDateType,
         observationId
      } = this.props

      let bgColor = (severty === "HIGH" ? "#ff0b37" : (severty === "LOW" ? "#2dca73" : "#ffb800"))
      return (
         <TableRow id={observationId} data-testid="observation-list-item" onClick={() => onClickObservation(observationId)}>
            <TableData>{title}</TableData>
            <TableData>{reportedOn}</TableData>
            <TableData>
               {Object.keys(pairedPerson).length !== 0 ?
                  <PersonDetails>
                     <Image src={src} className={'persons-xs'}></Image>
                     <PersonData>
                        {pairedPerson.name}<br />
                     ph:{pairedPerson.phone_no}
                     </PersonData>
                  </PersonDetails>
                  :
                  <PersonDetails>
                     <PersonData>
                        Rp not Assigned to
                     </PersonData>
                  </PersonDetails>
               }
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
            <TableData>{dueDateType === PUBLIC ? dueDate : PRIVATE}</TableData>
            <TableData>
               <Image
                  className={'message-icon'}
                  src={
                     "https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4983aced-8454-4506-9eee-0ff83acf662f.svg"
                  }
               />
               <MsgCount>{messages}</MsgCount>
            </TableData>
         </TableRow>
      )
   }
}
export { ObservationListItem }
