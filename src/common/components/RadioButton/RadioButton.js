import React, { Component } from 'react'

import {RadioButtonElement} from './styledComponent'

class RadioButton extends Component {
    render() {
        const {onHandleCheck}=this.props;
        return (
        <RadioButtonElement type="radio" onChange={onHandleCheck}></RadioButtonElement>
        )
    }
}
export {RadioButton}
