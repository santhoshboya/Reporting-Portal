export interface ValidationResponseType {
   errorMessage: string
   shouldShowError: boolean
}

export const validateEmptyInputField = (
   stringValue: string
): ValidationResponseType => {
   if (stringValue.trim() === '')
      return {
         shouldShowError: true,
         errorMessage: 'Required'
      }

   return {
      shouldShowError: false,
      errorMessage: 'No Error'
   }
}
