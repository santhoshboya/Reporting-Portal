import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
import { USER, RP } from '../../constants/NameConstants'
import "./index.css"
import Select from 'react-select'
function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component {
   renderOptions = (options) => {
      let dummyOptions = [...options];
      return dummyOptions.map(option => { return { value: option, label: option } })
   }
   render() {
      const { onSlectOption, options, value, isDisabled, className } = this.props
      console.log(78, value);


      return (

         // <SelectElement value={value} className={className ? className : (isDisabled ? "dropDown-field-disabled" : "dropDown-field-normal")}
         //    disabled={isDisabled} onChange={onSlectOption}>
         //    <SlectOptions > selectform</SlectOptions>
         //    {options.length > 0 ? options.map(option => (
         //       <Options option={option} />
         //    )) : null}
         // </SelectElement>
         <Select
            isDisabled={isDisabled}
            className={className ? className : "drop-down-select"}
            options={options.length > 0 ? this.renderOptions(options) : []}
            onChange={onSlectOption}
            value={value}
         />



      )
   }
}
export { DropDown }
