import styled from 'styled-components'
import Select from 'react-select'

import Colors from '../../themes/Colors'
import ReactSelectDropDownArrow from '../../icons/ReactSelectDropDownArrow'
import {
   Typo14DarkRR,
   Typo16DuskRR,
   Typo12PinkishOrangeRoboto,
   TextFontLabelBasic600
} from '../../styleGuide/Typos'
import colors from '../../themes/Colors'

export const DropDownContainer = styled('div')`
   width: 250px;
`
export const Label = styled(TextFontLabelBasic600)`
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

export const SelectField = styled(Select)`
   outline: none;
   width: 100%;
   height: 40px;
   padding: 0px;
   background-color: ${props =>
      props.isDisabled ? Colors.basic300 : Colors.whiteTwo};
   border-radius: 2px;
   border: solid 1px
      ${props => {
         if (props.isDisabled) {
            return Colors.black32
         } else if (props.isValid) {
            return Colors.steel
         }
         return Colors.pinkishOrange
      }};
   align-items: center;
   justify-content: center;
   .Select-container {
      height: 40px;
   }
   .Select__control {
      height: 40px;
      border: solid 1px
         ${props => (props.isValid ? Colors.black32 : Colors.pinkishOrange)};
      background-color: ${Colors.whiteTwo};
   }
   .Select__placeholder {
      color: ${props => props.isDisabled && Colors.darkGreyBlueTwoSix};
   }
   .Select__value-container {
      padding: 0 0 0 15px;
      display: flex;
      align-items: center;
      cursor: text;
   }
   .Select__single-value {
      margin: 0px;
      padding-left: 2px;
      font-family: Roboto;
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.15px;
      color: ${props =>
         props.isDisabled ? Colors.darkGreyBlueTwoSix : Colors.blackSeven};
   }
   .Select__indicator-separator {
      opacity: 0;
   }
   .Select__dropdown-indicator {
      padding: 0 10px 0 0;
      cursor: pointer;
   }
   .Select__menu {
      z-index: 2;
      margin-top: 5px !important;
      padding: 0px;
   }
   .Select__menu-list {
      padding: 0px;
      box-shadow: 2px 6px 10px 0 ${Colors.black12};
      border: solid 1px ${Colors.paleGrey};
      max-height: 150px;
   }
   .Select__option {
      padding: 13.5px 0px 13.5px 20px;
      cursor: pointer;
      color: ${Colors.dusk};
      background-color: ${Colors.whiteTwo};
      &:hover {
         span {
            color: ${Colors.white};
         }
      }
   }
   .Select__option--is-focused {
      background-color: ${Colors.primary500Default};
      span {
         color: ${Colors.white};
      }
   }

   .Select__control--is-disabled {
      border-width: 0px;
      border-color: ${Colors.black32};
      font-family: 'Roboto';
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.2px;
      color: ${Colors.darkGreyBlueTwoSix} !important;
   }
`

export const MenuOption = styled(Typo16DuskRR)`
   line-height: 1.5;
   letter-spacing: 0.15px;
   padding-top: 13.5px;
   padding-bottom: 13.5px;
`

export const DropDownIcon = styled(ReactSelectDropDownArrow)`
   transform: ${props =>
      props.isInverted ? 'rotate(0deg)' : 'rotate(180deg)'};
`

export const SelectContainer = styled('div')`
   display: flex;
   flex-direction: row;
   align-items: center;
`

export const Typo14DarkRRWithDiv = Typo14DarkRR.withComponent('div')

export const ValueOptionText = styled(Typo14DarkRRWithDiv)`
   opacity: 0.9;
   font-family: Roboto;
   font-size: 16px;
   text-align: left;
   color: ${Colors.dark};
   line-height: unset;
   padding-left: 0px;
`

export const ErrorView = styled.div`
   flex-direction: row;
   margin-top: 3px;
   margin-left: 3px;
`

export const ErrorMessage = styled(Typo12PinkishOrangeRoboto)`
   line-height: 2.03;
   letter-spacing: 0.11px;
   pointer-events: none;
`
