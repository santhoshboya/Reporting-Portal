import React, { Component } from 'react'
import { SelectElement, SlectOptions } from './styledComponent'
import { USER, RP } from '../../constants/NameConstants'
import './index.css'
import Select from 'react-select'

interface DropDownProps{
   onSlectOption:(value:string)=>void,
   options:Array<string>,
   value:string,
   isDisabled?:boolean,
   isMulti?:boolean,
   className?:string,
   placeholder?:string,
   userType?:string
}

function Options(props) {
   return <SlectOptions value={props.option}>{props.option}</SlectOptions>
}
class DropDown extends Component<DropDownProps> {
   renderOptions = options => {
      let dummyOptions = [...options]
      return dummyOptions.map(option => {
         return { value: option, label: option }
      })
   }
   renderValue = value => {
      if (typeof value !== 'string') {
         return value
      } else {
         return { value: value, label: value }
      }
   }
   render() {
      const {
         onSlectOption,
         options,
         value,
         isDisabled,
         isMulti,
         className,
         placeholder
      } = this.props


      return (
         <Select
            isDisabled={isDisabled}
            className={className ? className : 'drop-down-select'}
            options={options.length > 0 ? this.renderOptions(options) : []}
            onChange={onSlectOption}
            defaultValue={this.renderValue(value)}
            isMulti={isMulti}
            placeholder={placeholder}
         />
      )
   }
}
export { DropDown }