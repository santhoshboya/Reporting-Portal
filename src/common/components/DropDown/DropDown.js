import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   render() {
      const { onSlectOption, options, value, userType } = this.props
      return (
         <div>
            <SelectElement value={value} disabled={userType === 'user' ? true : false} onChange={onSlectOption}>
               <SlectOptions > selectform</SlectOptions>
               {options.map(option => (
                  <Options option={option} />
               ))}
            </SelectElement>
         </div>
      )
   }
}
export { DropDown }
