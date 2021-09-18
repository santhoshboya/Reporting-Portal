import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { action, observable } from 'mobx'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { API_SUCCESS } from '@ib/api-constants'

import BaseCheckBox from '../../../Common/components/BaseCheckBox'
import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import { resStatuses } from '../../../Common/constants/APIErrorConstants'
import { getFormattedAPIError } from '../../../Common/utils/APIErrorUtils'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'

// TODO: Handle Image Implementation
import IBHubsLogo from '../../components/IBHubsLogo'
// TODO: Handle Image Implementation
import LoginPageImage from '../../components/LoginPageImage'

import AuthStore from '../../stores/AuthStore'
import UserProfileDetailsStore from '../../stores/UserProfileDetailsStore'
import {
   validateEmailInputField,
   validatePasswordInputField
} from '../../utils/ValidationUtils'
import {
   FORGOT_PASSWORD_ROUTE_PATH,
   SIGNUP_ROUTE_PATH
} from '../../constants/NavigationConstants'
import {
   goToHomeRoute,
   isLoggedIn,
   RoleType
} from '../../utils/NavigationUtils'

import {
   LoginRouteContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   WelcomeText,
   RemaindMeAndForgotPasswordContainer,
   SignupNavigatingContainer,
   RightPaneContainer,
   LinkText,
   ErrorText
} from './styledComponents'

// FIXME: Resolve the WithTranslation import issue & replace custom WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface LoginRouteProps extends RouteComponentProps, WithTranslationProps {
   history: any //TODO: Add type
}

interface InjectedProps extends LoginRouteProps {
   authStore: AuthStore
   userProfileDetailsStore: UserProfileDetailsStore
}

@inject('authStore', 'userProfileDetailsStore')
@observer
class LoginRoute extends Component<LoginRouteProps> {
   @observable email = 'ibadmin@ibhubs.co'
   @observable password = 'Admin123@'
   @observable errorMessage: any = ''
   @observable hasRemaindMeChecked = false

   emailRef = React.createRef<TextInput>()
   passwordRef = React.createRef<TextInput>()
   prefixForT = 'userProfile:login.'

   getInjectedProps = () => this.props as InjectedProps

   getAuthStore = () => this.getInjectedProps().authStore

   getuserProfileDetailsStore = () =>
      this.getInjectedProps().userProfileDetailsStore

   @action.bound
   setAppropriateError({ errorConstant, description }) {
      const { emailRef, passwordRef } = this
      let refValue: React.RefObject<TextInput>
      this.errorMessage = description
      switch (errorConstant) {
         case resStatuses.invalidEmail:
         case resStatuses.userAccountDoesNotExist:
            refValue = emailRef
            break
         case resStatuses.incorrectPassword:
            refValue = passwordRef
            break
         default:
            return
      }
      refValue.current?.inputRef.current?.setError(description)
      this.errorMessage = ''
   }

   @action.bound
   onFailure(networkError: Error) {
      this.setAppropriateError(getFormattedAPIError(networkError))
   }

   @action.bound
   async onSuccess() {
      this.email = this.password = this.errorMessage = ''
      if (isLoggedIn()) {
         const { getUserProfileDetails } = this.getuserProfileDetailsStore()
         await getUserProfileDetails(
            this.navigateToRespectiveHomePage,
            this.onFailure
         )
      } else
         this.errorMessage = this.props.t(
            `${this.prefixForT}somethingWentWrong`
         )
   }

   @action.bound
   onClickLoginButton(e: any) {
      e.preventDefault()
      const {
         email,
         password,
         isErrorPresent,
         onSuccess,
         onFailure,
         getAuthStore
      } = this
      const { userLoginHandler } = getAuthStore()
      if (isErrorPresent()) return
      userLoginHandler({ email, password }, onSuccess, onFailure)
   }

   isErrorPresent = () => {
      const { emailRef, passwordRef } = this
      emailRef.current?.validateInput()
      passwordRef.current?.validateInput()

      if (emailRef.current?.isError) emailRef.current?.focus()
      else if (passwordRef.current?.isError) passwordRef.current?.focus()
      else return false
      return true
   }

   @action.bound
   onChangeEmailValue(e: any) {
      this.email = e.target.value
   }

   @action.bound
   onChangePasswordValue(e: any) {
      this.password = e.target.value
   }

   @action.bound
   onToggleHasRemaindMeChecked() {
      this.hasRemaindMeChecked = !this.hasRemaindMeChecked
   }

   navigateToRespectiveHomePage = () => {
      const { history } = this.props
      const {
         getUserProfileDetailsAPIStatus,
         userProfileDetails: { isAdmin }
      } = this.getuserProfileDetailsStore()

      const role: RoleType = isAdmin ? 'ADMIN' : 'USER'
      if (getUserProfileDetailsAPIStatus === API_SUCCESS)
         goToHomeRoute(history, role)
      else this.onSuccess()
   }

   renderLoaderUIForUserProfileDetails = () => {
      const { navigateToRespectiveHomePage } = this
      const {
         getUserProfileDetailsAPIStatus,
         getUserProfileDetailsAPIError
      } = this.getuserProfileDetailsStore()

      // FIXME: Handle renderSuccessView={} with appropriate component

      return (
         <LoadingWrapper
            apiStatus={getUserProfileDetailsAPIStatus}
            apiError={getUserProfileDetailsAPIError as Error}
            onRetry={navigateToRespectiveHomePage}
            renderSuccessView={() => <div />}
         />
      )
   }

   renderLoginUI = () => {
      const {
         props: { t },
         email,
         password,
         errorMessage,
         hasRemaindMeChecked,
         emailRef,
         passwordRef,
         onChangeEmailValue,
         onChangePasswordValue,
         onClickLoginButton,
         onToggleHasRemaindMeChecked,
         getAuthStore,
         prefixForT
      } = this

      const { getLoginAPIStatus } = getAuthStore()

      return (
         <LoginRouteContainer>
            <LeftPaneContainer>
               <ContentCenterWrapper onSubmit={onClickLoginButton}>
                  <IBHubsLogo />
                  <WelcomeText>
                     {t(`${prefixForT}getStartedWithYourAccount`)}
                  </WelcomeText>
                  <TextInput
                     label={t(`${prefixForT}email`)}
                     ref={emailRef}
                     value={email}
                     type='text'
                     placeholder={t(`${prefixForT}emailInputPlaceHolder`)}
                     validate={() => validateEmailInputField(email)}
                     onChange={onChangeEmailValue}
                  />
                  <TextInput
                     label={t(`${prefixForT}password`)}
                     ref={passwordRef}
                     value={password}
                     type='password'
                     placeholder={t(`${prefixForT}passwordInputPlaceHolder`)}
                     validate={() => validatePasswordInputField(password)}
                     onChange={onChangePasswordValue}
                  />
                  {errorMessage !== '' && <ErrorText>{errorMessage}</ErrorText>}
                  <Button
                     width='100%'
                     apiStatus={getLoginAPIStatus}
                     size={Button.sizes.medium}
                     text={t(`${prefixForT}login`)}
                     onClick={onClickLoginButton}
                  />
                  <RemaindMeAndForgotPasswordContainer>
                     <BaseCheckBox
                        checked={hasRemaindMeChecked}
                        label={t(`${prefixForT}remaindMe`)}
                        value={'value'}
                        onChange={onToggleHasRemaindMeChecked}
                     />
                     <LinkText as='a' href={FORGOT_PASSWORD_ROUTE_PATH}>
                        {t(`${prefixForT}forgotPassword`)}
                     </LinkText>
                  </RemaindMeAndForgotPasswordContainer>
                  <SignupNavigatingContainer>
                     {t(`${prefixForT}dontYouHaveAnAccount`)}
                     <LinkText as='a' href={SIGNUP_ROUTE_PATH}>
                        &nbsp;
                        {t(`${prefixForT}signup`)}
                     </LinkText>
                  </SignupNavigatingContainer>
               </ContentCenterWrapper>
            </LeftPaneContainer>
            <RightPaneContainer>
               <WelcomeText>
                  {t(`${prefixForT}focusOnBeingProductiveInsteadOfBusy`)}
               </WelcomeText>
               <LoginPageImage />
            </RightPaneContainer>
         </LoginRouteContainer>
      )
   }

   render() {
      const { renderLoginUI, renderLoaderUIForUserProfileDetails } = this
      return isLoggedIn()
         ? renderLoaderUIForUserProfileDetails()
         : renderLoginUI()
   }
}

export default withRouter(withTranslation()(LoginRoute))
