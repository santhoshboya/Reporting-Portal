import React, { Component } from 'react'
import { components } from 'react-select'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import 'twin.macro'
import debounce from 'lodash/debounce'
import { withTranslation, WithTranslation } from 'react-i18next'

import { API_FETCHING } from '@ib/api-constants'

import ErrorMessage from '../../ErrorMessage'
import Loader from '../../Loader'
import { ValidationResponseType, DropDownOption } from './types'
import {
   DropDownContainer,
   Label,
   MenuOption,
   SelectField,
   SelectContainer,
   ValueOptionText,
   DropDownIcon
} from './styledComponents'
import './styles.css'

const ValueContainer = ({
   children,
   ...props
}: DropDownProps): React.ReactNode => (
   <components.ValueContainer {...props}>
      <SelectContainer>
         <ValueOptionText>{children}</ValueOptionText>
      </SelectContainer>
   </components.ValueContainer>
)

const DropdownIndicator = props => {
   const { selectProps } = props
   const { menuIsOpen } = selectProps
   return (
      components.DropdownIndicator && (
         <components.DropdownIndicator {...props}>
            <DropDownIcon isInverted={menuIsOpen} />
         </components.DropdownIndicator>
      )
   )
}

const Option = (props: DropDownProps) => {
   const { isSelected, children } = props
   return (
      <components.Option {...props}>
         <MenuOption isSelected={isSelected}>{children}</MenuOption>
      </components.Option>
   )
}

interface DropDownProps extends WithTranslation {
   validate?: () => ValidationResponseType | undefined

   dropDownCss?: any

   containerCss?: any

   shouldDisableForSingleOption?: boolean

   onChange?: (value: string, selectedValue: string | number) => void

   [x: string]: any

   value?: DropDownOption

   labelText?: string

   placeholder?: string
}

@observer
class SearchableDropDownComponent extends Component<DropDownProps> {
   dropdownRef

   constructor(props) {
      super(props)
      this.dropdownRef = React.createRef()
   }

   static defaultProps = {
      validate: () => ({ shouldShowError: false, errorMessage: '' }),
      shouldDisableForSingleOption: false,
      labelText: ''
   }

   @observable error = ''

   @action setError(errorText: string) {
      this.error = errorText
   }

   onBlur = () => {
      const { validate } = this.props
      if (validate) {
         const result = validate()

         if (result && result.shouldShowError) {
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
   onChangeOption = (event): void => {
      const { onChange } = this.props
      if (onChange) {
         onChange(event.label, event.value)
      }
   }

   onChangeInput = debounce(text => {
      const { onInputChange } = this.props
      if (onInputChange) {
         onInputChange(text)
      }
   }, 500)

   noOptionsMessageComponent = (props: DropDownProps) => {
      const { apiStatus, t } = this.props

      return (
         <components.NoOptionsMessage {...props}>
            {apiStatus === API_FETCHING ? (
               <Loader className={'loader'} />
            ) : (
               t('common:apiSearchableDropDown.noResultsFound')
            )}
         </components.NoOptionsMessage>
      )
   }

   render() {
      const {
         className,
         labelText,
         errorId,
         onChange,
         value,
         dropDownCss,
         containerCss,

         ...otherProps
      } = this.props

      const { noOptionsMessageComponent: NoOptionsMessage } = this

      return (
         <DropDownContainer className={className} css={containerCss}>
            {labelText && <Label>{labelText.toUpperCase()}</Label>}
            <SelectField
               ref={this.dropdownRef}
               isValid={!this.isError}
               onBlur={this.onBlur}
               onFocus={this.onFocus}
               components={{
                  ValueContainer,
                  DropdownIndicator,
                  Option,
                  NoOptionsMessage
               }}
               classNamePrefix='Select'
               css={dropDownCss}
               isDisabled={this.getIsDisabled()}
               onChange={this.onChangeOption}
               value={value}
               onInputChange={this.onChangeInput}
               {...otherProps}
            />
            {this.error ? <ErrorMessage errorMessage={this.error} /> : null}
         </DropDownContainer>
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   SearchableDropDownComponent
)
