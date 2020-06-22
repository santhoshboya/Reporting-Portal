import React, { Component } from 'react'
import Modal from 'react-modal'
import { PopUpDiv, UserNmae } from './styledComponent'
import { Image } from '../Image'
import { PrimaryButton } from '../PrimaryButton'
import { inject } from 'mobx-react'
import { withRouter,RouterProps } from 'react-router-dom'
import { AuthStore } from "../../../Authuntication/stores/AuthStore"
type ReactModalPopUpProps={
   src:string,
   userName:string,
   isOpen:boolean,
   handleClick:()=>void,
   profilePicStyle:string,
   btnStyle:string,
   BtnValue:string,
   customStyles:any,
   authStore:AuthStore
}

@inject('authStore')
class ReactModalPopUp extends Component <ReactModalPopUpProps &RouterProps >{
   signOut = () => {
      this.props.authStore.userSignOut(
         {},
         () => {},
         () => {}
      )
      this.props.history.push('/signin')
   }
   render() {
      const {
         src,
         userName,
         isOpen,
         handleClick,
         profilePicStyle,
         btnStyle,
         BtnValue,
         customStyles
      } = this.props
      return (
         <Modal isOpen={isOpen} style={customStyles}>
            <PopUpDiv onBlur={handleClick}>
               <Image src={src} className={profilePicStyle} />
               <UserNmae>{userName}</UserNmae>
               <PrimaryButton
                  handleClick={this.signOut}
                  className={btnStyle}
                  value={BtnValue}
               />
            </PopUpDiv>
         </Modal>
      )
   }
}

export default withRouter(ReactModalPopUp)
