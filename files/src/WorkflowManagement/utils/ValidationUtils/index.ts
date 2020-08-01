export interface ValidationReturnProp {
   shouldShowError: boolean
   errorMessage: string
}
export const plainTextValidation = (value: string): ValidationReturnProp => {
   if (value === null || value === undefined) value = ''
   if (value.toString().trim() === '')
      return { shouldShowError: true, errorMessage: 'this field is mandatory' }
   return { shouldShowError: false, errorMessage: '' }
}

export const phoneNumberValidation = (
   phoneNumber: string
): ValidationReturnProp => {
   const phoneNumberRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
   if (phoneNumber.match(phoneNumberRegEx) !== null)
      return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const emailValidation = (email: string): ValidationReturnProp => {
   const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   if (email.match(emailRegEx))
      return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const urlValidation = (url: string): ValidationReturnProp => {
   const urlRegEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/
   if (url.match(urlRegEx)) return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const passwordValidation = (password: string): ValidationReturnProp => {
   if (password.length >= 8) return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const numberValidation = (value: string): ValidationReturnProp => {
   const numberRegEx = /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/
   if (value.match(numberRegEx))
      return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const floatValidation = (value: string): ValidationReturnProp => {
   const floatRegEx = /^-?\d*(\.\d+)?$/
   if (value.match(floatRegEx))
      return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'invalid' }
}

export const multiValueValidation = (
   multipleResponses: Array<string>
): ValidationReturnProp => {
   const isValid = multipleResponses.length === 0 ? false : true
   if (isValid) return { shouldShowError: false, errorMessage: '' }
   return { shouldShowError: true, errorMessage: 'this field is mandatory' }
}
