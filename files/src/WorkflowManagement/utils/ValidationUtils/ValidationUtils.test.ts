/*global expect*/
import {
   plainTextValidation,
   phoneNumberValidation,
   emailValidation,
   urlValidation,
   passwordValidation,
   numberValidation,
   floatValidation
} from './index'
describe('Text Validation utils', () => {
   it('should test plainTextValidation TRUE', () => {
      const result = plainTextValidation('')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'this field is mandatory'
      })
   })
   it('should test plainTextValidation FALSE', () => {
      const result = plainTextValidation('text')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test phoneNumberValidation TRUE', () => {
      const result = phoneNumberValidation('Phone number')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test phoneNumberValidation FALSE', () => {
      const result = phoneNumberValidation('9515954395')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test emailValidation TRUE', () => {
      const result = emailValidation('r151207@rgukt')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test emailValidation FALSE', () => {
      const result = emailValidation('r151207@rguktrkv.ac.in')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test urlValidation TRUE', () => {
      const result = urlValidation('url address')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test urlValidation FALSE', () => {
      const result = urlValidation(
         'http://dummy.restapiexample.com/api/v1/employees'
      )
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test passwordValidation TRUE', () => {
      const result = passwordValidation('sample')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test passwordValidation FALSE', () => {
      const result = passwordValidation('samplePassword')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test numberValidation TRUE', () => {
      const result = numberValidation('number')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test numberValidation FALSE', () => {
      const result = numberValidation('1')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
   it('should test floatValidation TRUE', () => {
      const result = floatValidation('1.')
      expect(result).toMatchObject({
         shouldShowError: true,
         errorMessage: 'invalid'
      })
   })
   it('should test floatValidation FALSE', () => {
      const result = floatValidation('1.000')
      expect(result).toMatchObject({
         shouldShowError: false,
         errorMessage: ''
      })
   })
})
