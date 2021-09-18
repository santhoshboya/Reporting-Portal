import {
   validateEmailInputField,
   validatePasswordInputField,
   validateConfirmPasswordInputField
} from '.'

describe('ValidationUtils', () => {
   it.skip('Should test validateEmailInputField()', () => {
      const validEmail = 'test.user@ibhubs.co',
         invalidEmail = 'test.com',
         emptyField = ''

      expect(validateEmailInputField(validEmail).shouldShowError).toBeFalsy()

      expect(validateEmailInputField(invalidEmail).shouldShowError).toBeTruthy()

      expect(validateEmailInputField(emptyField).shouldShowError).toBeTruthy()
   })

   it.skip('Should test validatePasswordInputField()', () => {
      const validPassword = 'paSS1@rd',
         invalidPassword = 'test',
         emptyField = ''

      expect(
         validatePasswordInputField(validPassword).shouldShowError
      ).toBeFalsy()

      expect(
         validatePasswordInputField(invalidPassword).shouldShowError
      ).toBeTruthy()

      expect(
         validatePasswordInputField(emptyField).shouldShowError
      ).toBeTruthy()
   })

   it.skip('Should test validateConfirmPasswordInputField()', () => {
      const validPassword = 'paSS1@rd',
         validConfirmPassword = 'paSS1@rd',
         invalidConfirmPassword = 'test',
         notMatchingConfirmPassword = 'paSS1@rd1',
         emptyField = ''

      expect(
         validateConfirmPasswordInputField(validPassword, validConfirmPassword)
            .shouldShowError
      ).toBeFalsy()

      expect(
         validateConfirmPasswordInputField(
            validPassword,
            invalidConfirmPassword
         ).shouldShowError
      ).toBeTruthy()

      expect(
         validateConfirmPasswordInputField(
            validPassword,
            notMatchingConfirmPassword
         ).shouldShowError
      ).toBeTruthy()

      expect(
         validateConfirmPasswordInputField(validPassword, emptyField)
            .shouldShowError
      ).toBeTruthy()
   })
})
