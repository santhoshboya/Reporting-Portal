import styled from 'styled-components'

import { TextFontC2Caption } from '../../styleGuide/Typos/styledComponents'
import { mobile } from '../../utils/MixinUtils'
import Colors from '../../themes/Colors'
import colors from '../../themes/Colors'
import CustomTag from './CustomTag'
import { InputProps } from './types'

interface Props extends InputProps {
   isValid: boolean
}

export const Input = styled(CustomTag)<Props>`
   width: 100%;
   box-sizing: border-box;
   color: ${Colors.darkBlueGrey};
   font-family: HKGrotesk;
   font-size: 14px;
   height: 40px;
   font-weight: normal;
   line-height: 1.71;
   padding-left: 16px;
   border-radius: 2px;
   border: solid 1px;
   border-width: 1px;
   border-color: ${props =>
      props.isValid ? Colors.steel : Colors.danger600Default};
   background-color: ${Colors.white};

   flex-grow: 1;
   &:focus {
      border: solid 1.5px
         ${props => (props.isValid ? Colors.azulTwo : Colors.danger600Default)};
      outline: none;
      font-weight: bold;
   }

   &:active {
      border: solid 1.5px
         ${props => (props.isValid ? Colors.azulTwo : Colors.danger600Default)};
      outline: none;
      font-weight: bold;
   }
   &:disabled {
      border: solid 1px;
      border-color: ${Colors.lightBlueGrey};
      color: ${Colors.darkGreyBlueTwoSix};
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.2px;
   }
   &::-webkit-input-placeholder {
      color: ${props =>
         props.isValid ? Colors.silver : Colors.blueyGrey} !important;
      opacity: 1;
   }
   &:-moz-placeholder {
      color: ${props =>
         props.isValid ? Colors.silver : Colors.blueyGrey} !important;
      opacity: 1;
   }
   &::-moz-placeholder {
      color: ${props =>
         props.isValid ? Colors.silver : Colors.blueyGrey} !important;
      opacity: 1;
   }
   border-radius: 2px;
   &:-ms-input-placeholder {
      color: ${props =>
         props.isValid ? Colors.silver : Colors.blueyGrey} !important;
      opacity: 1;
   }
   ${mobile} {
      margin-top: 8px;
   }
`

export const InputContainer = styled.div`
   width: 100%;
   border-radius: 2px;
   &:focus {
      border: 2px solid ${colors.primary500Default};
   }
`

export const textAreaStyles = {
   resize: 'none',
   lineHeight: 1.5
}

export const Label = styled(TextFontC2Caption)`
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: 0.12px;
   color: ${colors.steel};
   display: inline-block;
   margin-bottom: 8px;
`
export const InputWrapper = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
   position: relative;
`

export const IconWrapper = styled.span`
   margin-right: 12px;
   position: absolute;
   display: flex;
   padding-right: 5px;
`
