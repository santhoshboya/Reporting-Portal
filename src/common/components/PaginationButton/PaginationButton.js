import React, { Component } from 'react';
import { PaginationBtn } from './styledComponent'

class PaginationButton extends Component {
    render() {
        const { svg, changePage, isDisable } = this.props;
        const SvgImg = <img alt={'sidebutton'} src={svg} />
        console.log(isDisable)
        return (
            <PaginationBtn disabled={isDisable} onClick={changePage}>
                {SvgImg}
            </PaginationBtn>
        );
    }
}

export { PaginationButton };