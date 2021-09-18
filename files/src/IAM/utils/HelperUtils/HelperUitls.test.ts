import {
   isFetching,
   getFormattedRoleOptions,
   getFormattedTeamOptions
} from './HelperUtils'

describe('helper utils tests', () => {
   it('should return array of role objects with value and lable ', () => {
      const test_data = [{ roleId: '1', roleName: 'Approver' }]
      const result = getFormattedRoleOptions(test_data)
      const outputData = [
         { value: test_data[0].roleId, label: test_data[0].roleName }
      ]
      expect(result).toStrictEqual(outputData)
   })
   it('should return array of team objects with value and lable ', () => {
      const test_data = [{ teamId: '1', teamName: 'Tech' }]
      const result = getFormattedTeamOptions(test_data)
      const outputData = [
         { value: test_data[0].teamId, label: test_data[0].teamName }
      ]
      expect(result).toStrictEqual(outputData)
   })
   it('Should return true if apiStatus is fetching', () => {
      const apiStatus = 100
      const output = isFetching(apiStatus)
      expect(output).toBeTruthy()
   })
})
