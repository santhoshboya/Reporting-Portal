import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { action, observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import { getFormattedAPIError } from '../../../Common/utils/APIErrorUtils'
import { resStatuses } from '../../../Common/constants/APIErrorConstants'

// TODO: Handle Image Implementation
import IBHubsLogo from '../../components/IBHubsLogo'
// TODO: Handle Image Implementation
import PasswordPageImage from '../../components/PasswordPageImage'

import PasswordStore from '../../stores/PasswordStore'
import { validateEmailInputField } from '../../utils/ValidationUtils'
import { LOGIN_ROUTE_PATH } from '../../constants/NavigationConstants'
import {
   ForgotPasswordContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   WelcomeText,
   NavigatingContainer,
   RightPaneContainer,
   LinkText,
   SuccessText,
   ErrorText,
   CaptionText
} from './styledComponents'

// FIXME: Resolve the WithTranslation import issue & replace custom WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface ForgotPasswordRouteProps extends WithTranslationProps {
   // TODO: optimize this es-lint error
   any: any
}

interface InjectedProps extends ForgotPasswordRouteProps {
   passwordStore: PasswordStore
}

@inject('passwordStore')
@observer
class ForgotPasswordRoute extends Component<ForgotPasswordRouteProps> {
   @observable email = ''
   @observable errorMessage: any = ''
   @observable successMessage = ''
   prefixForT = 'userProfile:forgotPassword.'

   emailRef = React.createRef<TextInput>()

   getInjectedProps = () => this.props as InjectedProps

   getPasswordStore = () => this.getInjectedProps().passwordStore

   @action.bound
   setAppropriateError({ errorConstant, description }) {
      const { emailRef } = this
      let refValue: React.RefObject<TextInput>
      this.errorMessage = description
      switch (errorConstant) {
         case resStatuses.invalidEmail:
         case resStatuses.userAccountDoesNotExist:
            refValue = emailRef
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
   onSuccess() {
      const {
         props: { t },
         prefixForT,
         email
      } = this
      this.successMessage = t(`${prefixForT}mailParameterizedText`, {
         email: email.slice(-15)
      })
      this.email = this.errorMessage = ''
   }

   @action.bound
   onClickSubmitButton(e) {
      e.preventDefault()
      const {
         email,
         isErrorPresent,
         setFocussingToErrorField,
         onSuccess,
         onFailure,
         getPasswordStore
      } = this
      const { forgotPasswordHandler } = getPasswordStore()
      if (isErrorPresent()) setFocussingToErrorField()
      // TODO: Handle the navigation of UPDATE_PASSWORD_ROUTE_PATH (Need to send route a/ong with email?)
      else forgotPasswordHandler({ email }, onSuccess, onFailure)
   }

   isErrorPresent = () => {
      const { emailRef } = this
      emailRef.current?.validateInput()

      if (emailRef.current?.isError) emailRef.current?.focus()
      else return false
      return true
   }

   setFocussingToErrorField = () => {
      const { emailRef } = this
      if (emailRef.current?.isError) emailRef.current?.focus()
   }

   @action.bound
   onChangeEmailValue(e: any) {
      this.email = e.target.value
   }

   render() {
      const {
         props: { t },
         email,
         errorMessage,
         emailRef,
         onChangeEmailValue,
         onClickSubmitButton,
         getPasswordStore,
         successMessage,
         prefixForT
      } = this

      const { getForgotPasswordAPIStatus } = getPasswordStore()

      return (
         <ForgotPasswordContainer>
            <LeftPaneContainer>
               <ContentCenterWrapper onSubmit={onClickSubmitButton}>
                  <IBHubsLogo />
                  <WelcomeText>{t(`${prefixForT}welcomeText`)}</WelcomeText>
                  <CaptionText>{t(`${prefixForT}welcomeInfoText`)}</CaptionText>
                  <TextInput
                     label={t(`${prefixForT}email`)}
                     ref={emailRef}
                     value={email}
                     type='text'
                     placeholder={t(`${prefixForT}emailInputPlaceHolder`)}
                     validate={() => validateEmailInputField(email)}
                     onChange={onChangeEmailValue}
                     disabled={successMessage !== ''}
                  />
                  {successMessage !== '' && (
                     <>
                        <SuccessText>
                           {t(`${prefixForT}mailSentSuccessfully`)}
                        </SuccessText>
                        <SuccessText>{successMessage}</SuccessText>
                     </>
                  )}
                  {errorMessage !== '' && <ErrorText>{errorMessage}</ErrorText>}
                  <Button
                     width='100%'
                     apiStatus={getForgotPasswordAPIStatus}
                     size={Button.sizes.medium}
                     text={t(`${prefixForT}sendMail`)}
                     onClick={onClickSubmitButton}
                  />
                  <NavigatingContainer>
                     <LinkText as='a' href={LOGIN_ROUTE_PATH}>
                        {t(`${prefixForT}returnToLogin`)}
                     </LinkText>
                  </NavigatingContainer>
               </ContentCenterWrapper>
            </LeftPaneContainer>
            <RightPaneContainer>
               <PasswordPageImage />
            </RightPaneContainer>
         </ForgotPasswordContainer>
      )
   }
}

export default withTranslation()(ForgotPasswordRoute)
