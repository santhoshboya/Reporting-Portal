import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { SignInForm } from '../../components/SignInForm'

@inject('authStore')
@observer
class SignInRoute extends React.Component {
   @observable username = ''
   @observable password = ''
   @observable useNameErrorMessage = ''
   @observable passwordErrorMessage = ''

   @action.bound onChangeUsername(event) {
      this.username = event.target.value
   }

   @action.bound onChangePassword(event) {
      this.password = event.target.value
   }

   @action.bound onFailure() {
      const { getUserAuthAPIError: apiError } = this.props.authStore
      if (apiError !== null && apiError !== undefined) {
         this.passwordErrorMessage = 'Network Error'
      }
   }

   @action.bound onClickSignIn() {
      this.useNameErrorMessage = ''
      this.passwordErrorMessage = ''
      if (this.username === '')
         this.useNameErrorMessage = 'Please enter username'
      if (this.password === '')
         this.passwordErrorMessage = 'Please enter password'
      if (this.username !== '' && this.password !== '') {
         this.handleOnclick()
      }
   }

   handleOnclick = async () => {
      await this.props.authStore.userSignIn(
         { username: this.username, password: this.password },
         this.onSuccess,
         this.onFailure
      )
   }

   onSuccess = () => {
      this.props.history.push('/userobservationslist')
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
export { SignInRoute }
