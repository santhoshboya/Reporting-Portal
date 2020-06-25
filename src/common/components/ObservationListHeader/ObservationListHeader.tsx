import React, { Component } from 'react'
import './index.css'
import { TableRow, TableHeading, PersonTypeDiv } from './styledComponent'

import strings from '../../i18n/strings.json'
import { Image } from '../Image'

interface ObservationListHeaderProps{
   headings:Array<string>
   dueDateOnSort?:() => void
   reportedOnSort?:() => void

}

function TableHeadingDiv(props) {
   const { reportedOn, dueDate } = strings.userFeatures
   let onClick
   if (props.heading === reportedOn) onClick = props.reportedOnSort
   else if (props.heading === dueDate) onClick = props.dueDateOnSort

   if (props.heading === reportedOn || props.heading === dueDate) {
      return (
         <TableHeading onClick={onClick}>
            <PersonTypeDiv>
               {props.heading}
               <Image
                  className={'Chevron-Down-2'}
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4b787319-5164-4ca3-8687-cf9f1603e3d3.svg'
               />
            </PersonTypeDiv>
         </TableHeading>
      )
   } else {
      return <TableHeading>{props.heading}</TableHeading>
   }
}

class ObservationListHeader extends Component <ObservationListHeaderProps>{
   render() {
      const { headings, dueDateOnSort, reportedOnSort } = this.props
      return (
         <TableRow>
            {headings.map(heading => (
               <TableHeadingDiv
                  key={Math.random()}
                  reportedOnSort={reportedOnSort}
                  dueDateOnSort={dueDateOnSort}
                  heading={heading}
               />
            ))}
         </TableRow>
      )
   }
}
export { ObservationListHeader }
