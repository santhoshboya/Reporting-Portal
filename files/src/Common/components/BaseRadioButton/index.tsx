import * as React from 'react'
import { observer } from 'mobx-react'
import 'twin.macro'
import { withTranslation, WithTranslation } from 'react-i18next'

import RadioButtonNormalIcon from '../../icons/RadioButtonNormalIcon'
import RadioButtonSelectedIcon from '../../icons/RadioButtonSelectedIcon'
import RadioButtonDisabledIcon from '../../icons/RadioButtonDisabledIcon'
import RadioButtonSelectedDisabledIcon from '../../icons/RadioButtonSelectedDisabledIcon'
import i18n from '../../i18n'

import { RadioButtonOption } from './types'
import {
   RadioInput,
   Label,
   RadioImageContainer,
   LabelComponentContainer,
   RadioButtonLabel
} from './styledComponents'
import './styles.css'

interface BaseRadioButtonProps extends WithTranslation {
   onSelectOption: (value: string) => void
   disabled?: boolean
   option: RadioButtonOption
   testId?: string
   checked?: boolean
   labelStyleCss?: React.CSSProperties
   radioImageStyleCss?: React.CSSProperties
   radioImageSize?: number
   renderLabelComponent?: () => {}
   labelComponentContainerCss?: React.CSSProperties
}

@observer
class BaseRadioButton extends React.Component<BaseRadioButtonProps> {
   static defaultProps = {
      checked: false,
      disabled: false,
      testId: i18n.t('common:BaseRadioButton.radioButton'),
      labelStyleCss: {},
      radioImageStyleCss: {}
   }

   onChange = e => {
      const { onSelectOption, disabled } = this.props

      if (!disabled) {
         onSelectOption(e.target.value)
      }
   }

   renderRadioButtons = () => {
      const {
         checked,
         disabled,
         radioImageStyleCss,
         radioImageSize
      } = this.props
      if (checked) {
         if (disabled) {
            return (
               <RadioImageContainer
                  className='radioImage'
                  css={radioImageStyleCss}
               >
                  <RadioButtonSelectedDisabledIcon
                     height={radioImageSize}
                     width={radioImageSize}
                  />
               </RadioImageContainer>
            )
         }
         return (
            <RadioImageContainer
               className='radioImage'
               css={radioImageStyleCss}
            >
               <RadioButtonSelectedIcon
                  height={radioImageSize}
                  width={radioImageSize}
               />
            </RadioImageContainer>
         )
      }
      if (disabled) {
         return (
            <RadioImageContainer
               className='radioImage'
               css={radioImageStyleCss}
            >
               <RadioButtonDisabledIcon
                  height={radioImageSize}
                  width={radioImageSize}
               />
            </RadioImageContainer>
         )
      }
      return (
         <RadioImageContainer className='radioImage' css={radioImageStyleCss}>
            <RadioButtonNormalIcon
               height={radioImageSize}
               width={radioImageSize}
            />
         </RadioImageContainer>
      )
   }

   renderLabel = () => {
      const {
         option,
         renderLabelComponent,
         labelComponentContainerCss
      } = this.props

      if (renderLabelComponent) {
         return (
            <LabelComponentContainer css={labelComponentContainerCss}>
               {renderLabelComponent}
            </LabelComponentContainer>
         )
      }
      return <RadioButtonLabel>{option.label}</RadioButtonLabel>
   }

   render() {
      const { option, checked, testId, labelStyleCss, t } = this.props

      return (
         <Label css={labelStyleCss}>
            <RadioInput
               data-testid={testId}
               type={t('common:BaseRadioButton.radio')}
               checked={checked}
               onChange={this.onChange}
               value={option.value}
            />
            {this.renderRadioButtons()}
            {this.renderLabel()}
         </Label>
      )
   }
}
//TODO:make overflow label response styles

export default withTranslation('translations', { withRef: true })(
   BaseRadioButton
)
