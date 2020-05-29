import React, { Component } from 'react'
import { LableTag, InputWithLableDiv, ErrorMsgField } from './styledComponents'
import strings from '../../i18n/strings.json'
import { InputField } from '../InputField/InputField'
InputField
class InputFieldWithLable extends Component {
   render() {
      const {
         lable,
         type,
         value,
         onHandleChange,
         errorMsg,
         className,
         placeHolder
      } = this.props
      return (
         <InputWithLableDiv className={className}>
            <LableTag>{lable}</LableTag>
            <InputField
               type={type}
               value={value}
               onHandleChange={onHandleChange}
               placeHolder={placeHolder}
            ></InputField>
            <ErrorMsgField>{errorMsg}</ErrorMsgField>
         </InputWithLableDiv>
      )
   }
}
export { InputFieldWithLable }
