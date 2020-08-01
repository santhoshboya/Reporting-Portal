import { getRandomColorsArray } from './index'

describe('Color utils tests', () => {
   it('should test getRandomColorsArray function', () => {
      expect(getRandomColorsArray(6)).toHaveLength(6)
   })
})
