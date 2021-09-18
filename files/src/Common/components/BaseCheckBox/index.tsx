import * as React from 'react'
import { observer } from 'mobx-react'
import 'twin.macro'
import { withTranslation, WithTranslation } from 'react-i18next'

import BaseCheckBoxNormalIcon from '../../icons/BaseCheckBoxNormalIcon'
import BaseCheckBoxSelectedIcon from '../../icons/BaseCheckBoxSelectedIcon'
import CheckBoxDisabled from '../../icons/CheckBoxDisabled'
import CheckBoxSelectedDisabledIcon from '../../icons/CheckBoxSelectedDisabledIcon'
import i18n from '../../i18n'
import {
   CheckBoxLabel,
   Input,
   Label,
   LabelComponentContainer
} from './styledComponents'
import './styles.css'

interface BaseCheckBoxProps extends WithTranslation {
   onChange: (value: string) => void
   disabled?: boolean
   label: string
   value: string
   testId?: string
   checked?: boolean
   checkBoxTextCss?: React.CSSProperties
   checkBoxSize?: number
   renderLabelComponent?: () => {}
   labelComponentContainerCss?: React.CSSProperties
   checkBoxContainerCss?: React.CSSProperties
}

@observer
class BaseCheckBox extends React.Component<BaseCheckBoxProps> {
   static defaultProps = {
      checked: false,
      disabled: false,
      testId: i18n.t('common:checkBox.checkBox')
   }

   onChange = e => {
      const { onChange, disabled } = this.props

      if (!disabled) {
         onChange(e.target.value)
      }
   }

   renderCheckBox = () => {
      const { checked, disabled } = this.props
      if (checked) {
         if (disabled) {
            return (
               <div className='checkBoxImage'>
                  <CheckBoxSelectedDisabledIcon />
               </div>
            )
         }
         return (
            <div className='checkBoxImage'>
               <BaseCheckBoxSelectedIcon />
            </div>
         )
      }
      if (disabled) {
         return (
            <div className='checkBoxImage'>
               <CheckBoxDisabled />
            </div>
         )
      }
      return (
         <div className='checkBoxImage'>
            <BaseCheckBoxNormalIcon />
         </div>
      )
   }

   renderLabel = () => {
      const {
         label,
         renderLabelComponent,
         checkBoxTextCss,
         labelComponentContainerCss
      } = this.props

      if (renderLabelComponent) {
         return (
            <LabelComponentContainer css={labelComponentContainerCss}>
               {renderLabelComponent}
            </LabelComponentContainer>
         )
      }
      return <CheckBoxLabel css={checkBoxTextCss}>{label}</CheckBoxLabel>
   }

   render() {
      const { value, checked, testId, checkBoxContainerCss, t } = this.props

      return (
         <Label className='labelStyle' css={checkBoxContainerCss}>
            <Input
               data-testid={testId}
               type={t('common:checkBox.checkBox')}
               checked={checked}
               onChange={this.onChange}
               value={value}
            />
            {this.renderCheckBox()}
            {this.renderLabel()}
         </Label>
      )
   }
}

export default withTranslation('translations', { withRef: true })(BaseCheckBox)
