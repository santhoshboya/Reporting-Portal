import * as React from "react";
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { SignInForm } from '../../components/SignInForm'
import { toast } from 'react-toastify'
import { USER, RP, ADMIN } from '../../../common/constants/NameConstants'
import { AuthStore } from "../../stores/AuthStore";
import {withRouter} from 'react-router-dom'
import {History} from 'history'
type SignInRouteProp={
   authStore:AuthStore
   history:History,
   getUserAuthAPIStatus:number
}
@inject('authStore')
@observer
class SignInRoute extends React.Component<SignInRouteProp> {
   @observable username = ''
   @observable password = ''
   @observable useNameErrorMessage = ''
   @observable passwordErrorMessage = ''
   @observable errorMsg = ''

   @action.bound onChangeUsername(value) {
      this.username = value
      if (this.username === '')
         this.useNameErrorMessage = 'Please enter username'
      else this.useNameErrorMessage = ''
   }

   @action.bound onChangePassword(value) {
      this.password = value
      if (this.password === '')
         this.passwordErrorMessage = 'Please enter password'
      else this.passwordErrorMessage = ''
   }

   onFailure = () => {
      const { getUserAuthAPIError: apiError } = this.props.authStore
      if (apiError !== null && apiError !== undefined) {
         toast.error(this.props.authStore.getUserAuthAPIError, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
         })
      }
   }

   @action.bound handleOnclick() {
      this.useNameErrorMessage = ''
      this.passwordErrorMessage = ''
      if (this.username === '')
         this.useNameErrorMessage = 'Please enter username'
      if (this.password === '')
         this.passwordErrorMessage = 'Please enter password'
      if (this.username !== '' && this.password !== '') {
         return true
      }
   }

   onClickSignIn = async () => {
      if (this.handleOnclick())
         await this.props.authStore.userSignIn(
            { username: this.username, password: this.password },
            this.onSuccess,
            this.onFailure
         )
   }

   onSuccess = (userType:string) => {
      switch (userType) {
         case USER:
            this.props.history.push('/userobservationslist')
            break
         case RP:
            this.props.history.push('/rpobservationslist')
            break
         case ADMIN:
            this.props.history.push('/listofobservations')
            break
      }
   }

   render() {
      const { getUserAuthAPIStatus } = this.props.authStore
      return (
         <SignInForm
            username={this.username}
            password={this.password}
            useNameErrorMessage={this.useNameErrorMessage}
            passwordErrorMessage={this.passwordErrorMessage}
            onChangePassword={this.onChangePassword}
            onClickSignIn={this.onClickSignIn}
            onChangeUsername={this.onChangeUsername}
            getUserAuthAPIStatus={getUserAuthAPIStatus}
         />
      )
   }
}
export default withRouter(SignInRoute)  