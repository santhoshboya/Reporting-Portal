import {
   validateEmailId,
   validateUserName,
   validateSelectedTeams,
   isArrayEmpty,
   validateSelectedRoles
} from './ValidationUtils'

describe('Validation Util Tests', () => {
   it('Should test whether email is valid or not', () => {
      const email = '123@nb.com'
      expect(validateEmailId(email).shouldShowError).toBeFalsy()
   })
   it('Should test whether given username is valid or not', () => {
      const username = ''
      expect(validateUserName(username)).toBeTruthy()
   })
   it('Should validate selected teams', () => {
      const testTeams = [{ value: '1', label: 'Tech Team' }]
      const result = validateSelectedTeams(testTeams)
      expect(result.shouldShowError).toBeFalsy()
   })
   it('Should validate whether given array is empty or not', () => {
      const testTeams = []
      const result = isArrayEmpty(testTeams)
      expect(result).toBeTruthy()
   })
   it('Should validate selected roles', () => {
      const testTeams = [{ value: '1', label: 'reviewer' }]
      const result = validateSelectedRoles(testTeams)
      expect(result.shouldShowError).toBeFalsy()
   })
})
