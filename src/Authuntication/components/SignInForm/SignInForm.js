import React, { Component } from 'react'

import { DesktopLayoutAuth } from '../../../common/components/DesktopLayoutAuth'
import { Image } from '../../../common/components/Image'
import strings from '../../../common/i18n/strings.json'
import { PrimaryButton } from '../../../common/components/PrimaryButton'
import { InputFieldWithLable } from '../../../common/components/InputFieldWithLable'

import './index.css'
import {
   SignInFornDiv,
   GreetingMessage,
   SignUpLink,
   SignUpSpan
} from './styledComponent'

class SignInForm extends Component {
   render() {
      const {
         username,
         password,
         useNameErrorMessage,
         passwordErrorMessage,
         onChangePassword,
         onClickSignIn,
         onChangeUsername
      } = this.props
      return (
         <DesktopLayoutAuth>
            <SignInFornDiv>
               <Image
                  className={'ib-hubs-logo'}
                  src={
                     'https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/4ae9f7c5-6bee-4c47-a3ff-cb4fd7421ee3.svg'
                  }
               />
               <GreetingMessage className={'greeting-message'}>
                  {strings.logIn.hiTherePleaseSignIn}
               </GreetingMessage>
               <InputFieldWithLable
                  className={'sign-input-field'}
                  lable={strings.logIn.userName}
                  type={'text'}
                  value={username}
                  onHandleChange={onChangeUsername}
                  errorMsg={useNameErrorMessage}
               />
               <InputFieldWithLable
                  className={'sign-input-field'}
                  lable={strings.logIn.password}
                  type={'password'}
                  value={password}
                  onHandleChange={onChangePassword}
                  errorMsg={passwordErrorMessage}
               />
               <PrimaryButton
                  className={'primary-button-large'}
                  value={strings.logIn.logIn}
                  handleClick={onClickSignIn}
               />
               <SignUpLink>
                  {strings.logIn.doNotHaveAnAccount}
                  <SignUpSpan>{strings.logIn.signUp}</SignUpSpan>
               </SignUpLink>
            </SignInFornDiv>
         </DesktopLayoutAuth>
      )
   }
}

export { SignInForm }
