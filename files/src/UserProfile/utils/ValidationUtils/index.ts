import i18n from '../../../Common/i18n'

export interface ValidationResponseType {
   errorMessage: string
   shouldShowError: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/

const errorsFori18n = {
   noError: 'userProfile:errors.noError',
   required: 'userProfile:errors.required',
   invalidEmailAddress: 'userProfile:errors.invalidEmailAddress',
   pleaseEnterValidPassword: 'userProfile:errors.pleaseEnterValidPassword',
   passwordDoesntMatch: 'userProfile:errors.passwordDoesntMatch'
}

export const validateEmailInputField = (
   email: string
): ValidationResponseType => {
   if (email.trim() === '')
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errorsFori18n.required)
      }
   if (email.match(EMAIL_REGEX))
      return {
         shouldShowError: false,
         errorMessage: i18n.t(errorsFori18n.noError)
      }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errorsFori18n.invalidEmailAddress)
   }
}

export const validatePasswordInputField = (
   password: string
): ValidationResponseType => {
   if (password.trim() === '')
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errorsFori18n.required)
      }
   if (password.match(PASSWORD_REGEX))
      return {
         shouldShowError: false,
         errorMessage: i18n.t(errorsFori18n.noError)
      }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errorsFori18n.pleaseEnterValidPassword)
   }
}

export const validateConfirmPasswordInputField = (
   unique: string,
   repeated: string
) => {
   const { shouldShowError, errorMessage } = validatePasswordInputField(
      repeated
   )
   if (shouldShowError) return { shouldShowError, errorMessage }
   else if (unique !== repeated)
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errorsFori18n.passwordDoesntMatch)
      }
   return {
      shouldShowError: false,
      errorMessage: i18n.t(errorsFori18n.noError)
   }
}
