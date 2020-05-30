import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
import { USER, RP } from '../../constants/NameConstants'
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   render() {
      const { onSlectOption, options, value, userType, className } = this.props
      return (

         <SelectElement value={value} className={className} disabled={userType === USER ? true : false} onChange={onSlectOption}>
            <SlectOptions > selectform</SlectOptions>
            {options.map(option => (
               <Options option={option} />
            ))}
         </SelectElement>

      )
   }
}
export { DropDown }
