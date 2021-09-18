/*global expect*/
import { getValuesWithLabels } from '.'
describe('test Field Utils', () => {
   it('should test getValuesWithLabels', () => {
      const result = getValuesWithLabels(['one', 'two'])
      expect(result).toStrictEqual([
         { label: 'one', value: 'one' },
         { label: 'two', value: 'two' }
      ])
   })
})
