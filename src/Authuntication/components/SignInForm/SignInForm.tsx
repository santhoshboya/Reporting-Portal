import React, { Component } from 'react'

import { DesktopLayoutAuth } from '../../../common/components/DesktopLayoutAuth'
import { Image } from '../../../common/components/Image'
import strings from '../../../common/i18n/strings.json'
import { PrimaryButton } from '../../../common/components/PrimaryButton'
import { InputFieldWithLable } from '../../../common/components/InputFieldWithLable'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import {
   SignInFornDiv,
   GreetingMessage,
   SignUpLink,
   SignUpSpan
} from './styledComponent'

type SignInFormProps={
   username:string,
   password:string,
   useNameErrorMessage:string,
   passwordErrorMessage:string,
   onChangePassword:Function,
   onClickSignIn:Function,
   onChangeUsername:Function,
   getUserAuthAPIStatus:number
}

class SignInForm extends Component<SignInFormProps> {
   render() {
      const {
         username,
         password,
         useNameErrorMessage,
         passwordErrorMessage,
         onChangePassword,
         onClickSignIn,
         onChangeUsername,
         getUserAuthAPIStatus
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
                  type={'text'}
                  lable={strings.logIn.userName}
                  value={username}
                  onHandleChange={onChangeUsername}
                  errorMsg={useNameErrorMessage}
                  placeHolder={'Username'}
                  errorIconClassName={'error-icon'}
                  inputClassName={
                     useNameErrorMessage !== ''
                        ? 'error-input-element'
                        : 'input-element'
                  }
               />
               <InputFieldWithLable
                  className={'sign-input-field'}
                  type={'password'}
                  value={password}
                  lable={strings.logIn.password}
                  onHandleChange={onChangePassword}
                  errorMsg={passwordErrorMessage}
                  placeHolder={'Password'}
                  errorIconClassName={'error-icon'}
                  inputClassName={
                     passwordErrorMessage !== ''
                        ? 'error-input-element'
                        : 'input-element'
                  }
               />
               <PrimaryButton
                  className={'primary-button-large'}
                  value={strings.logIn.logIn}
                  handleClick={onClickSignIn}
                  apiStatus={getUserAuthAPIStatus}
               />
               <SignUpLink>
                  {strings.logIn.doNotHaveAnAccount}
                  <SignUpSpan href={'/signin'}>
                     {strings.logIn.signUp}
                  </SignUpSpan>
               </SignUpLink>
            </SignInFornDiv>
            <ToastContainer
               position='bottom-center'
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
         </DesktopLayoutAuth>
      )
   }
}

export { SignInForm }
