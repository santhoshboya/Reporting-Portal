import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   render() {
      const { onSlectOption, options,value } = this.props
      return (
         <div>
            <SelectElement value={value} onChange={onSlectOption}>
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
