import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   render() {
      const { onSlectOption, options } = this.props
      return (
         <div>
            <SelectElement onChange={onSlectOption}>
               <SlectOptions value='select'> selectform</SlectOptions>
               {options.map(option => (
                  <Options option={option} />
               ))}
            </SelectElement>
         </div>
      )
   }
}
export { DropDown }
