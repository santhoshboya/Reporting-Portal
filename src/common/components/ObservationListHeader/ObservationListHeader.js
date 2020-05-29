import React, { Component } from 'react'
import './index.css'
import {
   TableRow,
   TableHeading,
   PersonTypeDiv
} from './styledComponent'

import strings from '../../i18n/strings.json'
import { Image } from '../Image'


function TableHeadingDiv(props) {
   const { reportedOn, dueDate } = strings.userFeatures
   if (props.heading === reportedOn || props.heading === dueDate) {
      return (
         <TableHeading>
            <PersonTypeDiv>
               {props.heading}
               <Image
                  className={'Chevron-Down-2'}
                  src="https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg" />
            </PersonTypeDiv>
         </TableHeading>
      );
   }
   else {
      return <TableHeading>{props.heading}</TableHeading>
   }

}
class ObservationListHeader extends Component {
   render() {
      const {
         headings
      } = this.props
      return (
         <TableRow>
            {headings.map(heading => <TableHeadingDiv key={Math.random()} heading={heading} />)}
         </TableRow>
      )
   }
}
export { ObservationListHeader }
