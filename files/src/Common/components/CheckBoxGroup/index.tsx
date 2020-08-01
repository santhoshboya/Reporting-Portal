import * as React from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import 'twin.macro'

import BaseCheckBox from '../BaseCheckBox'
import ErrorMessage from '../ErrorMessage'
import { ValidationResponseType } from './types'
import {
   CheckBoxContainer,
   MainContainer,
   CheckBoxGroupLabel
} from './styledComponents'

interface Option {
   label: string
   value: string
   renderLabelComponent?: () => {}
}

interface CheckBoxProps {
   options: Array<Option>
   disabled?: boolean
   validate?: () => ValidationResponseType
   containerClassName?: string
   onChange: (value: string) => void
   selectedValues: Array<string>
   className?: string
   errorId?: string
   errorMessage?: string
   checkboxItemsContainerCss?: string
   checkboxMainContainerCss?: string
   checkboxItemsCss?: React.CSSProperties
   checkBoxTextCss?: any
   checkBoxSize?: number
   errorMessageContainerCSS?: React.CSSProperties
   labelComponentContainerCss?: React.CSSProperties
   checkBoxGroupLabel: string
   checkBoxGroupLabelCss?: React.CSSProperties
}

@observer
class CheckboxGroup extends React.Component<CheckBoxProps> {
   static defaultProps = {
      disabled: false,
      selectedValues: []
   }

   @observable error = ''

   @action setError(errorText: string) {
      this.error = errorText
   }

   @computed get isError() {
      return this.error !== ''
   }

   onValidate = () => {
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

   isValueChecked = (value: string) => {
      const { selectedValues } = this.props
      const index = selectedValues.indexOf(value)
      if (index !== -1) {
         this.setError('')
         return true
      }
      return false
   }

   renderOptions = () => {
      const { options, onChange, disabled, ...otherProps } = this.props
      const radioButtons = options.map((option, index) => (
         <BaseCheckBox
            {...otherProps}
            key={option.label + index}
            disabled={disabled}
            testId={option.label}
            label={option.label}
            value={option.value}
            onChange={onChange}
            checked={this.isValueChecked(option.value)}
            renderLabelComponent={option.renderLabelComponent}
         />
      ))

      return radioButtons
   }

   renderLabel = () => {
      const { checkBoxGroupLabelCss, checkBoxGroupLabel } = this.props
      return (
         <CheckBoxGroupLabel css={checkBoxGroupLabelCss}>
            {checkBoxGroupLabel}
         </CheckBoxGroupLabel>
      )
   }

   render() {
      const {
         containerClassName,
         className,
         errorId,
         checkboxMainContainerCss,
         checkboxItemsCss,
         errorMessageContainerCSS
      } = this.props
      return (
         <MainContainer className={className} css={checkboxMainContainerCss}>
            <CheckBoxContainer
               className={containerClassName}
               css={checkboxItemsCss}
            >
               {this.renderLabel()}
               {this.renderOptions()}
            </CheckBoxContainer>
            {this.isError && (
               <ErrorMessage
                  errorContainerCSS={errorMessageContainerCSS}
                  errorId={errorId}
                  errorMessage={this.error}
               />
            )}
         </MainContainer>
      )
   }
}

export default CheckboxGroup
