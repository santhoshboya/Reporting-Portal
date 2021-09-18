import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import i18n from '../../i18n'

import BaseCheckBox from '.'

describe('BaseCheckBox component test cases', () => {
   it('should call on change prop', () => {
      const onChange = jest.fn()
      const { getByTestId } = render(
         <BaseCheckBox value={'RED'} label={'red'} onChange={onChange} />
      )

      fireEvent.click(getByTestId(i18n.t('common:checkBox.checkBox')))
      expect(onChange).toBeCalled()
   })
})
