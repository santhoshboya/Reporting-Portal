import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
import { USER, RP } from '../../constants/NameConstants'
import "./index.css"
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   render() {
      const { onSlectOption, options, value, isDisabled, className } = this.props


      return (

         <SelectElement value={value} className={className ? className : (isDisabled ? "dropDown-field-disabled" : "dropDown-field-normal")}
            disabled={isDisabled} onChange={onSlectOption}>
            <SlectOptions > selectform</SlectOptions>
            {options.length > 0 ? options.map(option => (
               <Options option={option} />
            )) : null}
         </SelectElement>

      )
   }
}
export { DropDown }
