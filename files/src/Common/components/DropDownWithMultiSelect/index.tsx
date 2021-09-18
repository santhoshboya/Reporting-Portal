import React, { Component } from 'react'
import { components } from 'react-select'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import 'twin.macro'

import ErrorMessage from '../ErrorMessage'
import { ValidationResponseType, DropDownOption } from './types'
import ValueContainer from './ValueContainer'
import DropdownIndicator from './DropdownIndicator'
import Option from './Option'
import {
   DropDownContainer,
   Label,
   SelectField,
   customStyles
} from './styledComponents'
import './styles.css'

interface DropDownWithMultiSelectProps {
   validate?: () => ValidationResponseType
   dropDownCss?: any
   containerCss?: any
   shouldDisableForSingleOption?: boolean
   onChange?: (value: string) => void
   [x: string]: any
   value?: Array<DropDownOption>
   labelText?: string
   styles?: any
   ValueContainer?: (props: any) => JSX.Element
   Option?: (props: any) => JSX.Element
   maxMenuHeight?: number
   maxToShow?: number
}

@observer
class DropDownWithMultiSelect extends Component<DropDownWithMultiSelectProps> {
   dropdownRef
   constructor(props) {
      super(props)
      this.dropdownRef = React.createRef()
   }

   static defaultProps = {
      validate: () => ({ shouldShowError: false, errorMessage: '' }),
      shouldDisableForSingleOption: false,
      ValueContainer: ValueContainer,
      Option: Option,
      maxMenuHeight: 300,
      maxToShow: 3,
      styles: customStyles
   }

   static components = components
   @observable error = ''
   @action setError(errorText: string) {
      this.error = errorText
   }
   onBlur = () => {
      const { validate } = this.props
      if (validate) {
         const result = validate()
         if (result.shouldShowError) {
            this.setError(result.errorMessage)
         } else {
            this.setError('')
         }
      }
   }
   onFocus = () => {
      this.setError('')
   }
   @computed get isError() {
      return this.error !== ''
   }

   isOnlyOneOption = (): boolean => {
      const { options } = this.props
      return options && options.length === 1
   }
   getIsDisabled = (): boolean => {
      const { isDisabled, shouldDisableForSingleOption } = this.props
      return (
         (shouldDisableForSingleOption && this.isOnlyOneOption()) || isDisabled
      )
   }

   onChangeOption = options => {
      const { onChange } = this.props
      if (onChange) {
         onChange(options)
      }
   }

   render() {
      const {
         className,
         labelText,
         errorId,
         onChange,
         value,
         maxToShow,
         styles,
         dropDownCss,
         containerCss,
         maxMenuHeight,
         ValueContainer,
         Option,
         ...otherProps
      } = this.props
      return (
         <DropDownContainer className={className} css={containerCss}>
            {labelText ? <Label>{labelText.toUpperCase()}</Label> : null}
            <SelectField
               ref={this.dropdownRef}
               styles={styles}
               isValid={!this.isError}
               onBlur={this.onBlur}
               onFocus={this.onFocus}
               components={{
                  ValueContainer,
                  DropdownIndicator,
                  Option
               }}
               classNamePrefix='Select'
               css={dropDownCss}
               {...otherProps}
               isDisabled={this.getIsDisabled()}
               onChange={this.onChangeOption}
               value={value}
               isClearable={false}
               maxToShow={maxToShow}
               hideSelectedOptions={false}
               maxMenuHeight={maxMenuHeight}
               closeMenuOnSelect={false}
            />

            <ErrorMessage errorMessage={this.error} />
         </DropDownContainer>
      )
   }
}
export default DropDownWithMultiSelect
