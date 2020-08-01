import React, { Component } from 'react'
import { ButtonProps } from '../types'

import { StyledBaseButtonAsOutline } from './styledComponents'

export default class OutlineButton extends Component<ButtonProps> {
   render() {
      return <StyledBaseButtonAsOutline {...this.props} />
   }
}
