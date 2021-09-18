import * as React from 'react'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import 'twin.macro'

import { ValidationResponseType } from '../CheckBoxGroup/types'
import BaseRadioButton from '../BaseRadioButton'
import { RadioButtonOption } from '../BaseRadioButton/types'
import ErrorMessage from '../ErrorMessage'
import {
   RadioGroupContainer,
   MainContainer,
   RadioGroupLabel
} from './styledComponents'

interface RadioGroupProps {
   options: Array<RadioButtonOption>
   disabled?: boolean
   validate: () => ValidationResponseType
   containerClassName?: string
   onSelectOption: (value: string) => void
   selectedValue?: string
   className?: string
   errorId?: string
   radioItemCss?: React.CSSProperties
   radioImageCss?: React.CSSProperties
   radioItemsContainerCss?: React.CSSProperties
   radioMainContainerCss?: React.CSSProperties
   radioImageSize?: number
   radioGroupLabelCss?: React.CSSProperties
   radioGroupLabel: string
}

@observer
class RadioGroup extends React.Component<RadioGroupProps> {
   static defaultProps = {
      disabled: false,
      validate: () => {}
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
      const result = validate()
      if (result.shouldShowError) {
         this.setError(result.errorMessage)
      } else {
         this.setError('')
      }
   }

   onSelectOption = (value: string) => {
      const { onSelectOption } = this.props
      onSelectOption(value)
   }

   renderOptions = () => {
      const {
         options,
         selectedValue,
         disabled,
         radioItemCss,
         radioImageCss,
         radioImageSize
      } = this.props

      const radioButtons = options.map((option, index) => (
         <BaseRadioButton
            key={option.label + index}
            disabled={disabled}
            testId={option.label}
            option={option}
            onSelectOption={this.onSelectOption}
            checked={selectedValue === option.value}
            labelStyleCss={radioItemCss}
            radioImageStyleCss={radioImageCss}
            radioImageSize={radioImageSize}
         />
      ))

      return radioButtons
   }
   renderLabel = () => {
      const { radioGroupLabel, radioGroupLabelCss } = this.props
      return (
         <RadioGroupLabel css={radioGroupLabelCss}>
            {radioGroupLabel}
         </RadioGroupLabel>
      )
   }

   render() {
      const {
         containerClassName,
         className,
         radioMainContainerCss,
         radioItemsContainerCss
      } = this.props
      //FIXME: Twin macro css not working
      return (
         <MainContainer className={className} css={radioMainContainerCss}>
            {this.renderLabel()}
            <RadioGroupContainer
               className={containerClassName}
               css={radioItemsContainerCss}
            >
               {this.renderOptions()}
            </RadioGroupContainer>
            {this.isError && <ErrorMessage errorMessage={this.error} />}
         </MainContainer>
      )
   }
}

export default RadioGroup
