import i18n from '../../../Common/i18n'

const EMAILID_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^([^0-9]*)$/

const errors = {
   noError: 'userProfile:errors.noError',
   invalidEmailAddress: 'iam:users.errors.inValidEmail',
   usernameDoesnotMatch: 'iam:users.errors.invalidUsername',
   usernameContainsNumbers: 'iam:users.errors.shouldNotHaveNumbers',
   emptyUsername: 'iam:users.errors.emptyUsername',
   emptyEmail: 'iam:users.errors.emptyEmail',
   userOptionsError: 'iam:users.errors.selectUserOptions'
}

export function validateUserName(name: string) {
   if (name === '') {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.emptyUsername)
      }
   }
   if (name.length < 8) {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.usernameDoesnotMatch)
      }
   }
   if (name.match(USERNAME_REGEX))
      return {
         shouldShowError: false,
         errorMessage: i18n.t(errors.noError)
      }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errors.usernameContainsNumbers)
   }
}
interface ErrorObject {
   shouldShowError: boolean
   errorMessage: string
}
export function validateEmailId(emailId: string): ErrorObject {
   if (emailId === '') {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.emptyEmail)
      }
   }
   const trimmedEmailId: string = emailId.trim()
   if (EMAILID_REGEX.test(trimmedEmailId)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errors.invalidEmailAddress)
   }
}
export function validateCompany(selectedValue) {
   if (selectedValue === '') {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.userOptionsError)
      }
   }
   return {
      shouldShowError: false,
      errorMessage: ''
   }
}
export function isArrayEmpty(array) {
   return array.length === 0
}
export function validateSelectedTeams(selectedValues) {
   if (isArrayEmpty(selectedValues)) {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.userOptionsError)
      }
   }
   return {
      shouldShowError: false,
      errorMessage: ''
   }
}
export function validateSelectedRoles(selectedValues) {
   if (isArrayEmpty(selectedValues)) {
      return {
         shouldShowError: true,
         errorMessage: i18n.t(errors.userOptionsError)
      }
   }
   return {
      shouldShowError: false,
      errorMessage: ''
   }
}
