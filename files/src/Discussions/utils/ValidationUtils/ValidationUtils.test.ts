import { validateEmptyInputField } from '.'

describe('ValidationUtils', () => {
   it('Should test validateEmptyInputField()', () => {
      const validString = 'test.user@ibhubs.co',
         invalidEmptyString = ''

      expect(
         validateEmptyInputField(validString).shouldShowError === false
      ).toBeTruthy()

      expect(
         validateEmptyInputField(invalidEmptyString).shouldShowError === true
      ).toBeTruthy()
   })
})
