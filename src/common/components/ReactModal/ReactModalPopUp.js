import React, { Component } from 'react'
import Modal from 'react-modal'
import { PopUpDiv, UserNmae } from './styledComponent'
import { Image } from '../Image'
import { PrimaryButton } from '../PrimaryButton'
import { inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('authStore')
class ReactModalPopUp extends Component {

    signOut = () => {
        console.log(this.props.history, 12987896876);
        this.props.history.push("/signin")
        this.props.authStore.userSignOut({}, () => { }, () => { });

    }
    render() {
        const { src, userName, isOpen, handleClick, profilePicStyle, btnStyle, BtnValue, customStyles } = this.props
        console.log(isOpen, 123);

        return (
            <Modal isOpen={isOpen} style={customStyles} >
                <PopUpDiv onBlur={handleClick}>
                    <Image src={src} className={profilePicStyle} />
                    <UserNmae>{userName}</UserNmae>
                    <PrimaryButton handleClick={this.signOut} className={btnStyle} value={BtnValue} />

                </PopUpDiv>
            </Modal>

        )
    }
}

export default withRouter(ReactModalPopUp)
