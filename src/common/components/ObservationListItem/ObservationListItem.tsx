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

import { ADMIN, USER, RP } from '../../constants/NameConstants'

interface PersonData{
   first_name:string,
   profile_pic:string,
   last_name:string,
   phone_number:number
   
}

interface ObservationListItemProps{
   title:string,
   reportedOn:string,
   pairedPerson,
   severty:string,
   status:string,
   dueDate:string,
   messages:string,
   src:string,
   onClickObservation:(value:number)=>void,
   dueDateType:string,
   observationId:number,
   assignedTo?:PersonData,
   reportedBy?:PersonData,
   userType:string |null  
}

class ObservationListItem extends Component <ObservationListItemProps>{
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
         observationId,
         assignedTo,
         reportedBy,
         userType
      } = this.props

      let bgColor =
         severty === 'High'
            ? '#ff0b37'
            : severty === 'Low'
            ? '#2dca73'
            : '#ffb800'

      return (
         <TableRow
            id={`${observationId}`}
            data-testid='observation-list-item'
            onClick={() => onClickObservation(observationId)}
         >
            <TableData>{title}</TableData>

            {userType === ADMIN && reportedBy ? (
               <TableData>
                  <PersonDetails>
                     <Image src={src} className={'persons-xs'}></Image>
                     <PersonData>
                        {reportedBy.first_name}
                        <br />
                        ph:{reportedBy.phone_number}
                     </PersonData>
                  </PersonDetails>
               </TableData>
            ) : (
               <TableData>{`${reportedOn.slice(0, 10)} at ${reportedOn.slice(
                  11
               )}`}</TableData>
            )}

            {userType === ADMIN? (
               <TableData>
                  <RectangleSeverity bgColor={bgColor}>
                     <SevertyStatus>{severty}</SevertyStatus>
                  </RectangleSeverity>
               </TableData>
            ) : userType === RP  && reportedBy? (
               <TableData>
                  <PersonDetails>
                     <Image src={src} className={'persons-xs'}></Image>
                     <PersonData>
                        {reportedBy.first_name}
                        <br />
                        ph:{reportedBy.phone_number}
                     </PersonData>
                  </PersonDetails>
               </TableData>
            ) : (
               <TableData>
                  {assignedTo != null &&
                  Object.keys(assignedTo).length !== 0 ? (
                     <PersonDetails>
                        <Image
                           src={
                              assignedTo.profile_pic
                                 ? assignedTo.profile_pic
                                 : src
                           }
                           className={'persons-xs'}
                        ></Image>
                        <PersonData>
                           {assignedTo.first_name}
                           <br />
                           ph:{assignedTo.phone_number}
                        </PersonData>
                     </PersonDetails>
                  ) : (
                     <PersonDetails>
                        <PersonData>Rp not Assigned to</PersonData>
                     </PersonDetails>
                  )}
               </TableData>
            )}

            {userType === ADMIN ? (
               <TableData>
                  <RectangleActionStatus>
                     <ObservationStatus>{status}</ObservationStatus>
                  </RectangleActionStatus>
               </TableData>
            ) : (
               <TableData>
                  <RectangleSeverity bgColor={bgColor}>
                     <SevertyStatus>{severty}</SevertyStatus>
                  </RectangleSeverity>
               </TableData>
            )}

            {userType === ADMIN ? (
               <TableData>
                  {assignedTo != null &&
                  Object.keys(assignedTo).length !== 0 ? (
                     <PersonDetails>
                        <Image src={src} className={'persons-xs'}></Image>
                        <PersonData>
                           {assignedTo.first_name}
                           <br />
                           ph:{assignedTo.phone_number}
                        </PersonData>
                     </PersonDetails>
                  ) : (
                     <PersonDetails>
                        <PersonData>Rp not Assigned to</PersonData>
                     </PersonDetails>
                  )}
               </TableData>
            ) : (
               <TableData>
                  <RectangleActionStatus>
                     <ObservationStatus>{status}</ObservationStatus>
                  </RectangleActionStatus>
               </TableData>
            )}

            <TableData>{dueDateType === PUBLIC ? dueDate : PRIVATE}</TableData>

            <TableData>
               <Image
                  className={'message-icon'}
                  src={
                     'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4983aced-8454-4506-9eee-0ff83acf662f.svg'
                  }
               />
               <MsgCount>{messages}</MsgCount>
            </TableData>
         </TableRow>
      )
   }
}
export { ObservationListItem }
