import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { action, observable } from 'mobx'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import { getFormattedAPIError } from '../../../Common/utils/APIErrorUtils'
import { resStatuses } from '../../../Common/constants/APIErrorConstants'
import { waitForMilliseconds } from '../../../Common/utils/TestUtils'
import { setAccessToken } from '../../../Common/utils/StorageUtils'

// TODO: Handle Image Implementation
import IBHubsLogo from '../../components/IBHubsLogo'
// TODO: Handle Image Implementation
import PasswordPageImage from '../../components/PasswordPageImage'

import PasswordStore from '../../stores/PasswordStore'
import {
   validatePasswordInputField,
   validateConfirmPasswordInputField
} from '../../utils/ValidationUtils'
import {
   goToLoginRoute,
   goToLinkHasExpiredRoute,
   isLoggedIn
} from '../../utils/NavigationUtils'

import { LOGIN_ROUTE_PATH } from '../../constants/NavigationConstants'
import {
   UpdatePasswordContainer,
   LeftPaneContainer,
   ContentCenterWrapper,
   WelcomeText,
   NavigatingContainer,
   RightPaneContainer,
   LinkText,
   SuccessText,
   ErrorText
} from './styledComponents'

// FIXME: Resolve the WithTranslation import issue & replace custom WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface UpdatePasswordRouteProps
   extends WithTranslationProps,
      RouteComponentProps {
   history: any //TODO: Add type
}

interface InjectedProps extends UpdatePasswordRouteProps {
   passwordStore: PasswordStore
}

@inject('passwordStore')
@observer
class UpdatePasswordRoute extends Component<UpdatePasswordRouteProps> {
   @observable password = ''
   @observable confirmPassword = ''
   @observable errorMessage: any = ''
   @observable successMessage = ''
   token = ''
   prefixForT = 'userProfile:updatePassword.'

   passwordRef = React.createRef<TextInput>()
   confirmPasswordRef = React.createRef<TextInput>()

   componentDidMount() {
      // FIXME: Handle this token-situation properly
      const searchString = this.props.location.search
      const queryObject = new URLSearchParams(searchString)
      const token = queryObject.get('token')
      token && setAccessToken(token)
   }

   getInjectedProps = () => this.props as InjectedProps

   getPasswordStore = () => this.getInjectedProps().passwordStore

   @action.bound
   setAppropriateError({ errorConstant, description }) {
      const {
         props: { history },
         passwordRef
      } = this
      let refValue: React.RefObject<TextInput>
      this.errorMessage = description
      switch (errorConstant) {
         case resStatuses.tokenHasExpired:
         case resStatuses.tokenDoesNotExist:
            goToLinkHasExpiredRoute(history)
            return
         case resStatuses.passwordMinLength:
         case resStatuses.passwordAtLeastOneNumber:
         case resStatuses.passwordAtLeastOneUppercaseLetter:
         case resStatuses.passwordAtLeastOneSpecialCharacter:
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
      // TODO: Optimize Handling Signin & navigate to userHomePage
      const {
         props: { t },
         prefixForT
      } = this
      this.successMessage = t(`${prefixForT}successMessage`)
      this.password = this.confirmPassword = this.errorMessage = ''
      console.log(isLoggedIn())
      await waitForMilliseconds(1000)
      goToLoginRoute(this.props.history)
   }

   @action.bound
   onClickUpdateButton(e) {
      e.preventDefault()
      const {
         password,
         token,
         isErrorPresent,
         onSuccess,
         onFailure,
         getPasswordStore
      } = this
      const { updatePasswordHandler } = getPasswordStore()
      if (isErrorPresent()) return
      updatePasswordHandler({ password, token }, onSuccess, onFailure)
   }

   isErrorPresent = () => {
      const { confirmPasswordRef, passwordRef } = this
      confirmPasswordRef.current?.validateInput()
      passwordRef.current?.validateInput()

      if (passwordRef.current?.isError) passwordRef.current?.focus()
      else if (confirmPasswordRef.current?.isError)
         confirmPasswordRef.current?.focus()
      else return false
      return true
   }

   @action.bound
   onChangePasswordValue(e: any) {
      this.password = e.target.value
   }

   @action.bound
   onChangeConfirmPasswordValue(e: any) {
      this.confirmPassword = e.target.value
   }

   render() {
      const {
         props: { t },
         password,
         confirmPassword,
         errorMessage,
         passwordRef,
         confirmPasswordRef,
         onChangePasswordValue,
         onChangeConfirmPasswordValue,
         onClickUpdateButton,
         getPasswordStore,
         successMessage,
         prefixForT
      } = this

      const { getUpdatePasswordAPIStatus } = getPasswordStore()

      return (
         <UpdatePasswordContainer>
            <LeftPaneContainer>
               <ContentCenterWrapper onSubmit={onClickUpdateButton}>
                  <IBHubsLogo />
                  <WelcomeText>{t(`${prefixForT}welcomeText`)}</WelcomeText>
                  <TextInput
                     label={t(`${prefixForT}password`)}
                     ref={passwordRef}
                     value={password}
                     type='password'
                     placeholder={t(`${prefixForT}passwordInputPlaceHolder`)}
                     validate={() => validatePasswordInputField(password)}
                     onChange={onChangePasswordValue}
                  />
                  <TextInput
                     label={t(`${prefixForT}confirmPassword`)}
                     ref={confirmPasswordRef}
                     value={confirmPassword}
                     type='password'
                     placeholder={t(
                        `${prefixForT}confirmPasswordInputPlaceHolder`
                     )}
                     validate={() =>
                        validateConfirmPasswordInputField(
                           password,
                           confirmPassword
                        )
                     }
                     onChange={onChangeConfirmPasswordValue}
                  />
                  {successMessage !== '' && (
                     <SuccessText>{successMessage}</SuccessText>
                  )}
                  {errorMessage !== '' && <ErrorText>{errorMessage}</ErrorText>}
                  <Button
                     width='100%'
                     apiStatus={getUpdatePasswordAPIStatus}
                     size={Button.sizes.medium}
                     text={t(`${prefixForT}updatePassword`)}
                     onClick={onClickUpdateButton}
                  />
                  <NavigatingContainer>
                     <LinkText as='a' href={LOGIN_ROUTE_PATH}>
                        {t(`${prefixForT}skip`)}
                     </LinkText>
                  </NavigatingContainer>
               </ContentCenterWrapper>
            </LeftPaneContainer>
            <RightPaneContainer>
               <PasswordPageImage />
            </RightPaneContainer>
         </UpdatePasswordContainer>
      )
   }
}

export default withTranslation()(withRouter(UpdatePasswordRoute))
