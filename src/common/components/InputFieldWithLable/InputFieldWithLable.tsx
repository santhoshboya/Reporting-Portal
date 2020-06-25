import React, { Component } from 'react'
import { LableTag, InputWithLableDiv, ErrorMsgField } from './styledComponents'
import strings from '../../i18n/strings.json'
import { InputField } from '../InputField/InputField'
import { ErrorIcon } from '../ErrorIcon'
interface InputFieldWithLableProps{
   lable:string,
   type:string
   value:string,
   onHandleChange:(value:string)=>void,
   errorMsg:string,
   className:string,
   placeHolder:string,
   errorIconClassName:string,
   inputClassName:string   
}
class InputFieldWithLable extends Component <InputFieldWithLableProps>{
   render() {
      const {
         lable,
         type,
         value,
         onHandleChange,
         errorMsg,
         className,
         placeHolder,
         errorIconClassName,
         inputClassName
      } = this.props
      return (
         <InputWithLableDiv className={className}>
            <LableTag>{lable}</LableTag>
            <InputField
               type={type}
               value={value}
               onHandleChange={onHandleChange}
               placeHolder={placeHolder}
               className={inputClassName}
            ></InputField>
            {errorMsg !== '' && <ErrorIcon className={errorIconClassName} />}
            <ErrorMsgField>{errorMsg}</ErrorMsgField>
         </InputWithLableDiv>
      )
   }
}
export { InputFieldWithLable }
